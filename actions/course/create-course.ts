"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { uploader } from "@/lib/s3";
import { createCourseSchema, CreateCourseSchema } from "@/schema/course/create-course-schema";
/**
 * Steps : 
 * 1. Validate the form data => done
 * 2. Create the course => done
 * 3. Upload the files to R2
 * 4. Create the course in the database
 * 5. Return the course
 * 6. create modules for the course using ai
 */


export async function createCourseEntry(formData: any) {
    console.log("==== CREATE COURSE ENTRY CALLED ====");
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
        bucketName: !!process.env.R2_BUCKET_NAME
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
            console.log("Files data type:", typeof files);
            console.log("Is array:", Array.isArray(files));
            
            // Check what's in the files array
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                console.log(`File ${i} type:`, typeof file);
                console.log(`File ${i} properties:`, Object.keys(file));
                
                // Check if file is actually a File object
                if (typeof file === 'object') {
                    console.log(`File ${i} name:`, file.name);
                    console.log(`File ${i} size:`, file.size);
                    console.log(`File ${i} type:`, file.type);
                    console.log(`File ${i} instanceof File:`, file instanceof File);
                    
                    try {
                        console.log(`File ${i} can be read:`, !!file.arrayBuffer);
                    } catch (error) {
                        console.log(`File ${i} cannot be read:`, error);
                    }
                }
            }
            
            // Process each file and upload to R2
            for (const file of files) {
                console.log("Processing file:", file.name);
                
                try {
                    const fileKey = uploader.generateUniqueFileKey(file.name, `courses/${course.id}/notes`);
                    console.log("Generated file key:", fileKey);
                    
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
            console.log("Notes value:", data.notes);
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
        console.error("Error in createCourseEntry:", error);
        throw error;
    }
}