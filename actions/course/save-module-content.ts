"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function saveModuleContent(moduleId: string, content: string) {
  console.log(`Attempting to save content for module ${moduleId}`);
  
  if (!moduleId) {
    console.error("No moduleId provided");
    return { success: false, error: "Module ID is required" };
  }
  
  if (!content || content.trim() === '') {
    console.error("Empty content provided");
    return { success: false, error: "Content cannot be empty" };
  }
  
  try {
    // Update in a single transaction
    const module = await prisma.$transaction(async (tx) => {
      // Check if module exists first
      const existing = await tx.module.findUnique({
        where: { id: moduleId },
        select: { id: true }
      });
      
      if (!existing) {
        throw new Error(`Module with ID ${moduleId} not found`);
      }
      
      // Perform the update with forced timestamp
      return tx.module.update({
        where: { id: moduleId },
        data: {
          content: content,
          updatedAt: new Date() 
        }
      });
    });
    
    console.log(`Successfully saved content for module ${moduleId}`, {
      contentLength: module.content?.length || 0,
      updatedAt: module.updatedAt
    });
    
    // Revalidate paths
    revalidatePath(`/modules/${moduleId}`);
    revalidatePath(`/course/${module.courseId}`);
    
    return { success: true };
    
  } catch (error) {
    console.error("Error saving module content:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error saving content" 
    };
  }
} 