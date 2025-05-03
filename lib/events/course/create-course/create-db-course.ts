import { prisma } from "@/lib/db/prisma";
import { Event } from "@/models/Event";
import { CreateCourseSchema } from "@/schema/course/create-course-schema";

const createDbCourse = async (data : CreateCourseSchema) => {
    // Map the form fields to database fields
    const courseData = {
        name: data.name,
        outcome: data.mainOutcome,
        currentLevel: data.currentLevel
    };
    
    const course = await prisma.course.create({
        data: courseData
    });
    
    return course;
}

const createUserCourse = async ({ courseId, userId } : { courseId : string, userId: string }) => {
    if (!courseId) {
        throw new Error("Missing courseId in createUserCourse");
    }
    
    const userCourse = await prisma.userCourse.create({
        data: {
            courseId,
            userId
        }
    });
    
    return userCourse;
}

export const createDbCourseEvent = new Event("create-db-course", "Create DB Course", "Create DB Course", createDbCourse);
export const createUserCourseEvent = new Event("create-user-course", "Create User Course", "Create User Course", createUserCourse);