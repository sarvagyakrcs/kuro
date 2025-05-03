import { Event } from "@/models/Event";
import { courseSchema } from "@/schema/course/get-modules-schems";
import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

type CourseModuleType = z.infer<typeof courseSchema>;

const getCourseModulesUsingAi = async (data : {
    name: string,
    currentLevel: string,
    mainOutcome: string,
}) => {
    try {
        // Using more explicit prompting to get the model to generate content
        const { object } = await generateObject({
            model: groq('qwen-qwq-32b'),
            schema: courseSchema,
            prompt: `
                Generate a comprehensive list of subtopics for a course titled "${data.name}".
                
                This course is for ${data.currentLevel} level students who want to ${data.mainOutcome}.
                
                The response MUST include detailed subtopics that cover all essential concepts.
                Each subtopic MUST have a clear title, detailed description, and be organized in logical order.
                
                For each subtopic, include:
                1. A descriptive title
                2. A detailed explanation of what the subtopic covers
                3. Any prerequisites needed (optional)
                4. A difficulty level (Beginner, Intermediate, or Advanced)
                5. The format type (TEXT, VIDEO, MD, or QUIZ)
                
                Be thorough and comprehensive in your response.
            `,
        });
        
        return object;
    } catch (error) {
        console.error("Error generating AI modules:", error);
        throw error;
    }
}

export const createAiModulesEvent = new Event("create-ai-modules", "Create AI Modules", "Create AI Modules", getCourseModulesUsingAi);