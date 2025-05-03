import { prisma } from "@/lib/db/prisma";
import { embeddingModel } from "@/lib/embedding-model";
import { extractTextFromDocument } from "@/lib/file-loaders";
import { uploader } from "@/lib/s3";
import { embed, embedMany } from "ai";
import { writeFile, mkdir, rm } from "fs/promises";
import path from "path";

export const embedSingleFile = async (file: File, notesId: string) => {
    // save locally
    // embed
    // save to db

    //step 1: save locally
    const fileKey = uploader.generateUniqueFileKey(file.name, `${file.name}-${Date.now()}`);
    const uploadsDir = path.resolve(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, fileKey);

    const fileDir = path.dirname(filePath);
    await mkdir(fileDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const deleteFile = async () => {
        try {
            await rm(fileDir, { recursive: true, force: true });
            console.log(`Deleted ${fileDir}`);
        } catch (error) {
            console.error(`Error deleting ${fileDir}:`, error);
        }
    };

    //step2 : load the file and split into chunks
    const chunks: string[] = [];
    const text = await extractTextFromDocument(filePath);
    for (let i = 0; i < text.length; i += 8000) {
        chunks.push(text.substring(i, i + 8000));
    }

    //step 2: embed
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: chunks
    });

    console.log({ embeddings });

    for(let i = 0; i < embeddings.length; i++){
        await prisma.$executeRaw`
            UPDATE "CourseAttachment"
            SET "summaryEmbedding" = ${embeddings[i]}::vector
            WHERE "id" = ${notesId}
        `
    }

    return { filePath, deleteFile };
}