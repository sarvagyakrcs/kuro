"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function saveModuleContent(moduleId: string, content: string) {
  try {
    // Update the module content in the database
    await prisma.module.update({
      where: { id: moduleId },
      data: { content }
    });
    
    // Revalidate the path to refresh the content
    revalidatePath(`/modules/${moduleId}`);
    revalidatePath(`/course/[courseId]`);
    
    return { success: true };
  } catch (error) {
    console.error("Error saving module content:", error);
    return { success: false, error: "Failed to save module content" };
  }
} 