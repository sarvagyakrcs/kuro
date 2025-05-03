import { prisma } from "@/lib/db/prisma";

const getCourseAttachments = async () => {
    const courseAttachments = await prisma.$executeRaw`
        SELECT * FROM "CourseAttachment"
        WHERE "summaryEmbedding" IS NOT NULL
    `;
    return courseAttachments;
}

getCourseAttachments()
    .then(console.log)
    .catch(console.error);