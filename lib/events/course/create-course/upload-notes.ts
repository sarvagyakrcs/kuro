import { prisma } from "@/lib/db/prisma";
import { uploader } from "@/lib/s3";
import { Event } from "@/models/Event";

const uploadNotes = async ({ notes, courseId, userId } : {notes : any, courseId : string, userId: string}) => {
    let attachments: { id: string; url: string; name: string; fileKey: string; contentType: string }[] = [];

        if (notes && Array.isArray(notes)) {
            for (const file of notes) {
                try {
                    const fileKey = uploader.generateUniqueFileKey(file.name, `courses/${courseId}/notes`);
                    const uploadResult = await uploader.uploadBrowserFile(fileKey, file, {
                        isPublic: true,
                        metadata: {
                            courseId: courseId,
                            userId: userId,
                        }
                    });

                    if (uploadResult.success) {
                        const attachment = await prisma.courseAttachment.create({
                            data: {
                                courseId: courseId,
                                name: file.name,
                                url: uploadResult.publicUrl || fileKey,
                                key: fileKey,
                                contentType: file.type
                            }
                        });

                        attachments.push({
                            id: attachment.id,
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
        
        return attachments;
}

export const uploadNotesEvent = new Event("upload-notes", "Upload Notes", "Upload Notes", uploadNotes);