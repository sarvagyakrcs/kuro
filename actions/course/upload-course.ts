"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { uploader } from "@/lib/s3";
import { createCourseSchema } from "@/schema/course/create-course-schema";

export async function uploadCourseWithFiles(formData: any) {
    console.log("==== UPLOAD COURSE WITH FILES CALLED ====");
    console.log("Form data received:", {
        name: formData.name,
        mainOutcome: formData.mainOutcome,
        currentLevel: formData.currentLevel,
        notes: formData.notes ? 
            `${Array.isArray(formData.notes) ? formData.notes.length : 'not an array'} files` : 
            "no files"
    });

    // Check environment variables
    console.log("R2 environment variables set:", {
        accountId: !!process.env.R2_ACCOUNT_ID,
        accessKeyId: !!process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: !!process.env.R2_SECRET_ACCESS_KEY,
        bucketName: !!process.env.R2_BUCKET_NAME,
        publicUrl: !!process.env.R2_PUBLIC_URL
    });

    const session = await auth();

    if (!session?.user) {
        console.error("No authenticated user found");
        throw new Error("Unauthorized")
    }

    console.log("Authenticated user:", session.user.id);

    // step 1 : validate the form data
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
            throw new Error("Invalid form data")
        }

        console.log("Form validation passed");
        
        // step 2 : create the course
        console.log("Creating course in database");
        const course = await prisma.course.create({
            data: {
                name: data.name,
                outcome: data.mainOutcome,
                currentLevel: data.currentLevel,
            }
        });
        console.log("Course created:", course.id);

        console.log("Creating user course relationship");
        const userCourse = await prisma.userCourse.create({
            data: {
                userId: session.user.id!,
                courseId: course.id,
            }
        });
        console.log("User course created:", userCourse.id);

        // step 3 : upload the files to R2 if any are provided
        let attachments: { url: string; name: string; fileKey: string; contentType: string }[] = [];
        
        // Check if notes contains files
        if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
            const files = data.notes;
            
            console.log("Processing files:", files.length);
            
            // Process each file and upload to R2
            for (const file of files) {
                console.log("Processing file:", file.name);
                
                try {
                    const fileKey = uploader.generateUniqueFileKey(file.name, `courses/${course.id}/notes`);
                    
                    console.log("Starting upload to R2");
                    const uploadResult = await uploader.uploadBrowserFile(fileKey, file, {
                        isPublic: true,
                        metadata: {
                            courseId: course.id,
                            userId: session.user.id!,
                        }
                    });
                    
                    console.log("Upload result:", uploadResult);
                    
                    if (uploadResult.success) {
                        console.log("File uploaded successfully, creating attachment record");
                        // Create attachment record in database
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
                        
                        console.log("Created attachment:", attachment.id);
                    } else {
                        console.error("Failed to upload file:", file.name, uploadResult.error);
                    }
                } catch (error) {
                    console.error("Error processing file:", file.name, error);
                }
            }
        } else {
            console.log("No files to process");
        }

        console.log("Returning success response");
        return {
            success: true,
            data: {
                course,
                userCourse,
                attachments
            }
        }
    } catch (error) {
        console.error("Error in uploadCourseWithFiles:", error);
        throw error;
    }
} 