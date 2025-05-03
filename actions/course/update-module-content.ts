"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// Direct database update function with immediate feedback
export async function updateModuleContent(moduleId: string, content: string): Promise<{ success: boolean; error?: string }> {
  console.log(`Saving content to module ${moduleId}`, { contentLength: content.length });
  
  if (!moduleId) {
    console.error("No moduleId provided");
    return { success: false, error: "No moduleId provided" };
  }
  
  if (!content || content.trim() === '') {
    console.error("No content provided");
    return { success: false, error: "No content provided" };
  }
  
  try {
    // First, check if the module exists
    const moduleExists = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { id: true }
    });
    
    if (!moduleExists) {
      console.error(`Module with ID ${moduleId} not found`);
      return { success: false, error: `Module with ID ${moduleId} not found` };
    }
    
    // Update the module content in the database with explicit return of the updated module
    const updatedModule = await prisma.module.update({
      where: { id: moduleId },
      data: { 
        content: content,
        updatedAt: new Date() // Force update timestamp
      },
      select: {
        id: true,
        content: true,
        updatedAt: true
      }
    });
    
    // Verify the update was successful
    if (!updatedModule || !updatedModule.content) {
      console.error("Update seemed to succeed but content is still empty");
      return { success: false, error: "Database update failed to save content" };
    }
    
    console.log(`Successfully updated module ${moduleId}`, { 
      updatedAt: updatedModule.updatedAt,
      contentSaved: !!updatedModule.content,
      contentLength: updatedModule.content.length
    });
    
    // Revalidate the path to refresh the content
    revalidatePath(`/modules/${moduleId}`);
    revalidatePath(`/course/[courseId]`);
    
    return { 
      success: true
    };
  } catch (error) {
    console.error("Error updating module content:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error updating module content" 
    };
  }
} 