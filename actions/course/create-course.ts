"use server";

import { Event } from "@/models/Event";
import { EventOrchestrator } from "@/models/EventOrchestrator";
import { authEvent } from "@/lib/events/auth/auth-server";
import { validateDataEvent } from "@/lib/events/course/create-course/validate-data";
import { createDbCourseEvent, createUserCourseEvent } from "@/lib/events/course/create-course/create-db-course";
import { uploadNotesEvent } from "@/lib/events/course/create-course/upload-notes";
import { createAiModulesEvent } from "@/lib/events/course/create-course/create-ai-modules";
import { uploadModulesToDBEvent } from "@/lib/events/course/create-course/upload-modules-to-ai";
import { z } from "zod";
import { createCourseSchema } from "@/schema/course/create-course-schema";
import { sendNotificationEvent } from "@/lib/events/course/create-course/send-notification";

// steps : 
// 1. authenticate the user
// 2. Valide the form data
// 3. create the course
// 4. create the userCourse
// 5. upload the notes
// 6. create ai modules (parallel with uploading the notes)
// 7. upload the modules to the database
// 8. send a notification to the user

export async function createCourseEntry(formData: z.infer<typeof createCourseSchema>) {
    try {
        // USING EVENT ORCHESTRATOR
        // Override the task functions to include the necessary parameters
        const validateFn = validateDataEvent.task;
        validateDataEvent.task = async () => await validateFn(formData);

        const createDbCourseFn = createDbCourseEvent.task;
        createDbCourseEvent.task = async () => {
            const data = validateDataEvent.result;
            return await createDbCourseFn(data);
        };

        const createUserCourseFn = createUserCourseEvent.task;
        createUserCourseEvent.task = async () => {
            const user = authEvent.result;
            const course = createDbCourseEvent.result;
            return await createUserCourseFn({ courseId: course.id, userId: user.id });
        };

        const uploadNotesFn = uploadNotesEvent.task;
        uploadNotesEvent.task = async () => {
            const user = authEvent.result;
            const course = createDbCourseEvent.result;
            return await uploadNotesFn({ notes: formData.notes, courseId: course.id, userId: user.id });
        };

        const createAiModulesFn = createAiModulesEvent.task;
        createAiModulesEvent.task = async () => {
            const course = createDbCourseEvent.result;
            return await createAiModulesFn({
                name: course.name,
                currentLevel: course.currentLevel || "",
                mainOutcome: course.outcome || ""
            });
        };

        const uploadModulesToDBFn = uploadModulesToDBEvent.task;
        uploadModulesToDBEvent.task = async () => {
            const user = authEvent.result;
            const course = createDbCourseEvent.result;
            const aiModules = createAiModulesEvent.result;
            
            return await uploadModulesToDBFn({ 
                aiModules, 
                courseId: course.id, 
                userId: authEvent.result
            });
        };

        const sendNotificationFn = sendNotificationEvent.task;
        sendNotificationEvent.task = async () => {
            const user = authEvent.result;
            const course = createDbCourseEvent.result;
            return await sendNotificationFn(user.id, course.name);
        };

        // Create the adjacency list for the orchestrator
        const adjList = new Map<Event, Event[]>();
        adjList.set(authEvent, [validateDataEvent]);
        adjList.set(validateDataEvent, [createDbCourseEvent]);
        adjList.set(createDbCourseEvent, [createUserCourseEvent, uploadNotesEvent, createAiModulesEvent]);
        adjList.set(createUserCourseEvent, [sendNotificationEvent]);
        adjList.set(uploadNotesEvent, []);
        adjList.set(createAiModulesEvent, [uploadModulesToDBEvent, sendNotificationEvent]);
        adjList.set(uploadModulesToDBEvent, []);
        adjList.set(sendNotificationEvent, []);

        // Create and run the orchestrator
        const orchestrator = new EventOrchestrator(adjList);
        await orchestrator.run();

        // Return the created course
        return {
            success: true,
            data: {
                course: createDbCourseEvent.result,
                userCourse: createUserCourseEvent.result,
                aiModules: createAiModulesEvent.result ? {
                    name: createAiModulesEvent.result.name,
                    subtopics: createAiModulesEvent.result.subtopics
                } : null,
                modulesCount: uploadModulesToDBEvent.result?.count || 0
            }
        };
    } catch (error) {
        console.error("Error in createCourseEntry:", error);
        throw error;
    }
}