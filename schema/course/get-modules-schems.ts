import { z } from "zod";

export const courseSchema = z.object({
    name: z.string(),
    subtopics: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            prerequisites: z.array(z.string()).optional(),
            difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
            type: z.enum(['TEXT', 'VIDEO', 'MD', 'QUIZ'])
        })
    ),
});