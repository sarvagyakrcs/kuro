"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { uploader } from "@/lib/s3";
import { createCourseSchema } from "@/schema/course/create-course-schema";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { courseSchema } from "@/schema/course/get-modules-schems";
import { getCourseModulesUsingAi } from "@/scripts/test/ai";
import { z } from "zod";

export async function createCourseEntry(formData: any) {
    const session = await auth();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    try {
        const {
            success,
            data,
            error
        } = createCourseSchema.safeParse({
            name: formData.name,
            mainOutcome: formData.mainOutcome,
            currentLevel: formData.currentLevel,
            notes: formData.notes
        });

        if (!success) {
            console.error("Form validation failed:", error);
            throw new Error("Invalid form data");
        }

        const course = await prisma.course.create({
            data: {
                name: data.name,
                outcome: data.mainOutcome,
                currentLevel: data.currentLevel,
            }
        });

        const userCourse = await prisma.userCourse.create({
            data: {
                userId: session.user.id!,
                courseId: course.id,
            }
        });

        let attachments: { url: string; name: string; fileKey: string; contentType: string }[] = [];

        if (data.notes && Array.isArray(data.notes)) {
            for (const file of data.notes) {
                try {
                    const fileKey = uploader.generateUniqueFileKey(file.name, `courses/${course.id}/notes`);
                    const uploadResult = await uploader.uploadBrowserFile(fileKey, file, {
                        isPublic: true,
                        metadata: {
                            courseId: course.id,
                            userId: session.user.id!,
                        }
                    });

                    if (uploadResult.success) {
                        const attachment = await prisma.courseAttachment.create({
                            data: {
                                courseId: course.id,
                                name: file.name,
                                url: uploadResult.publicUrl || fileKey,
                                key: fileKey,
                                contentType: file.type
                            }
                        });

                        attachments.push({
                            name: file.name,
                            url: uploadResult.publicUrl || fileKey,
                            fileKey,
                            contentType: file.type
                        });
                    }
                } catch (error) {
                    console.error("Error uploading file:", file.name, error);
                }
            }
        }

        const result = await getCourseModulesUsingAi({
            name: data.name,
            currentLevel: data.currentLevel,
            mainOutcome: data.mainOutcome
        });

        const typedResult = result as unknown as z.infer<typeof courseSchema>;

        await prisma.module.createMany({
            data: typedResult.subtopics.map((subtopic: { title: string; description: string }, index: number) => ({
                name: subtopic.title,
                description: subtopic.description,
                courseId: course.id,
                order: index,
                moduleType: "MD"
            }))
        })

        return {
            success: true,
            data: {
                course,
                userCourse,
                attachments
            }
        };

    } catch (error) {
        console.error("Error in createCourseEntry:", error);
        throw error;
    }
}
