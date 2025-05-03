import { prisma } from "@/lib/db/prisma";
import { Event } from "@/models/Event";
import { courseSchema } from "@/schema/course/get-modules-schems";
import { z } from "zod";

const uploadModulesToDB = async ({ aiModules, courseId, userId } : {aiModules : z.infer<typeof courseSchema>, courseId : string, userId : string}) => {
    try {
        // Check if courseId is missing
        if (!courseId) {
            console.error("Missing courseId in uploadModulesToDB");
            return { count: 0, message: "Missing courseId" };
        }
        
        if (!aiModules || !aiModules.subtopics || !Array.isArray(aiModules.subtopics) || aiModules.subtopics.length === 0) {
            console.error("No valid modules to upload");
            return { count: 0, message: "No valid modules to upload" };
        }
        
        const moduleData = aiModules.subtopics.map(module => {
            // Map the generated modules to the actual database schema
            return {
                courseId, // Ensure courseId is explicitly used
                name: module.title || "Untitled Module",
                description: module.description || "No description provided",
                // Convert the type to a valid ModuleType enum value
                moduleType: mapModuleType(module.type || "TEXT")
            };
        });
        
        const result = await prisma.module.createMany({
            data: moduleData
        });
        
        return result;
    } catch (error) {
        console.error("Error uploading modules to DB:", error);
        return { count: 0, error: String(error) };
    }
}

// Helper function to map the AI-generated type to a valid ModuleType enum value
function mapModuleType(type: string): "VIDEO" | "TEXT" | "CHART" | "MD" | "QUIZ" {
    switch (type.toUpperCase()) {
        case "VIDEO":
            return "VIDEO";
        case "MD":
            return "MD";
        case "QUIZ":
            return "QUIZ";
        default:
            return "TEXT";
    }
}

export const uploadModulesToDBEvent = new Event("upload-modules-to-ai", "Upload Modules to AI", "Upload Modules to AI", uploadModulesToDB);