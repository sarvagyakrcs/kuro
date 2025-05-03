import { prisma } from "@/lib/db/prisma";
import { embed } from "ai";
import { Module } from "@prisma/client";
import { embeddingModel } from "@/lib/embedding-model";

const getNotesWithAi = async (module: Module) => {
    const { embedding } = await embed({
        model: embeddingModel,
        value: module.name + " " + module.description + " " + module.moduleType
    })
    const result = await prisma.$queryRaw`
    SELECT "name", "url", "summary",
    1 - ("summaryEmbedding" <=> ${embedding}::vector) AS CosineSimilarity
    FROM "CourseAttachment"
    ORDER BY CosineSimilarity DESC
    LIMIT 2
  ` as { name: string, url: string, summary: string, CosineSimilarity: number }[];

    const context = result.map(note => note.summary).join("\n\n");
    
    return { notes: result, context };
}

export default getNotesWithAi;