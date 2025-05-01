import * as z from "zod";

export const createCourseSchema = z.object({
    name: z.string().min(1),
    mainOutcome: z.string().min(1, "Main outcome is required"),
    currentLevel: z.string().min(1, "Please select your current level"),
    notes: z.any()
});

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
