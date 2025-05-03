import { prisma } from "@/lib/db/prisma";
import { embeddingModel } from "@/lib/embedding-model";
import { extractTextFromDocument } from "@/lib/file-loaders";
import { uploader } from "@/lib/s3";
import { embed, embedMany, generateText } from "ai";
import { writeFile, mkdir, rm } from "fs/promises";
import path from "path";
import { groq } from "@ai-sdk/groq";

export const embedSingleFile = async (file: File, attachmentId: string) => {
    try {
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
        if (!text || text.length === 0) {
            console.error("No text extracted from document");
            return { filePath, deleteFile };
        }
        
        // Split into smaller chunks
        const CHUNK_SIZE = 8000;
        for (let i = 0; i < text.length; i += CHUNK_SIZE) {
            chunks.push(text.substring(i, i + CHUNK_SIZE));
        }

        if (chunks.length === 0) {
            console.error("No chunks created from document");
            return { filePath, deleteFile };
        }

        console.log(`Created ${chunks.length} chunks from document`);

        //step 3: check if attachment exists
        const attachment = await prisma.courseAttachment.findUnique({
            where: { id: attachmentId }
        });

        if (!attachment) {
            console.error(`Attachment with ID ${attachmentId} not found`);
            return { filePath, deleteFile };
        }

        //step 4: generate summary with AI
        let summary = "";
        try {
            // Generate a concise summary of the text
            const summaryResult = await generateText({
                model: groq('qwen-qwq-32b'),
                providerOptions: {
                    groq: { reasoningFormat: 'parsed' },
                },
                prompt: `Summarize the following text in about 200 words, focusing on the key points and main ideas:\n\n${chunks[0].substring(0, 4000)}`,
                maxTokens: 300,
            });
            
            summary = summaryResult.toString();
            console.log(`Generated summary: ${summary.substring(0, 100)}...`);
        } catch (error) {
            console.error("Error generating summary:", error);
            // Use a portion of the original text as a fallback summary
            summary = chunks[0].substring(0, 500) + "...";
        }

        //step 5: embed chunks in parallel
        try {
            // Only embed the first chunk for now since we're just storing one summary embedding
            // In a more advanced implementation, we could embed all chunks and store them separately
            const { embeddings } = await embedMany({
                model: embeddingModel,
                values: [chunks[0]]
            });

            console.log(`Generated ${embeddings.length} embeddings`);

            if (embeddings.length === 0) {
                console.error("No embeddings generated");
                return { filePath, deleteFile };
            }

            // Save the embedding vector and summary
            const result = await prisma.$executeRaw`
                UPDATE "CourseAttachment"
                SET "summaryEmbedding" = ${embeddings[0]}::vector,
                    "summary" = ${summary}
                WHERE "id" = ${attachmentId}
            `;
            
            console.log(`Successfully updated embedding and summary for attachment ${attachmentId}, result: ${result}`);
            
        } catch (error) {
            console.error("Error generating or saving embeddings:", error);
        }
        
        return { filePath, deleteFile };
    } catch (error) {
        console.error("Error in embedSingleFile:", error);
        // Return a dummy object to prevent further errors
        return { 
            filePath: "", 
            deleteFile: async () => { console.log("No file to delete"); } 
        };
    }
}

// Function to process multiple chunks in parallel
export const embedMultipleChunks = async (file: File, attachmentId: string) => {
    try {
        // Save file locally first
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

        // Extract and chunk the text
        const text = await extractTextFromDocument(filePath);
        if (!text || text.length === 0) {
            console.error("No text extracted from document");
            return { filePath, deleteFile };
        }

        // Split into smaller chunks
        const CHUNK_SIZE = 8000;
        const chunks: string[] = [];
        for (let i = 0; i < text.length; i += CHUNK_SIZE) {
            chunks.push(text.substring(i, i + CHUNK_SIZE));
        }

        if (chunks.length === 0) {
            console.error("No chunks created from document");
            return { filePath, deleteFile };
        }

        console.log(`Created ${chunks.length} chunks from document for full processing`);

        // Verify attachment exists
        const attachment = await prisma.courseAttachment.findUnique({
            where: { id: attachmentId }
        });

        if (!attachment) {
            console.error(`Attachment with ID ${attachmentId} not found`);
            return { filePath, deleteFile };
        }

        // Generate summary (using the first chunk)
        let summary = "";
        try {
            const summaryResult = await generateText({
                model: groq('qwen-qwq-32b'),
                providerOptions: {
                    groq: { reasoningFormat: 'parsed' },
                },
                prompt: `Summarize the following text in about 200 words, focusing on the key points and main ideas:\n\n${chunks[0].substring(0, 4000)}`,
                maxTokens: 300,
            });
            
            summary = summaryResult.toString();
            console.log(`Generated summary: ${summary.substring(0, 100)}...`);
        } catch (error) {
            console.error("Error generating summary:", error);
            summary = chunks[0].substring(0, 500) + "...";
        }

        // Process chunks in parallel (for now just use the first chunk for embedding)
        try {
            // Process up to 5 chunks in parallel to avoid rate limiting
            const MAX_CHUNKS_TO_PROCESS = Math.min(5, chunks.length);
            const chunksToProcess = chunks.slice(0, MAX_CHUNKS_TO_PROCESS);
            
            console.log(`Processing ${chunksToProcess.length} chunks in parallel`);
            
            // Generate embeddings for multiple chunks in parallel
            const { embeddings } = await embedMany({
                model: embeddingModel,
                values: chunksToProcess
            });

            if (embeddings.length === 0) {
                console.error("No embeddings generated");
                return { filePath, deleteFile };
            }

            console.log(`Generated ${embeddings.length} embeddings`);

            // Use the first embedding for the summary embedding
            // In a more advanced implementation, we could store all embeddings
            const result = await prisma.$executeRaw`
                UPDATE "CourseAttachment"
                SET "summaryEmbedding" = ${embeddings[0]}::vector,
                    "summary" = ${summary}
                WHERE "id" = ${attachmentId}
            `;
            
            console.log(`Successfully updated embedding and summary for attachment ${attachmentId}, result: ${result}`);
            
        } catch (error) {
            console.error("Error generating or saving embeddings:", error);
        }

        return { filePath, deleteFile };
    } catch (error) {
        console.error("Error in embedMultipleChunks:", error);
        return { 
            filePath: "", 
            deleteFile: async () => { console.log("No file to delete"); } 
        };
    }
}