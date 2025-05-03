"use server"

import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

/**
 * Server action to update module video URL
 */
export async function updateModuleVideo(moduleId: string, videoUrl: string) {
  await prisma.module.update({
    where: { id: moduleId },
    data: { videoUrl }
  })
  
  // Properly revalidate path outside of rendering
  revalidatePath(`/modules/${moduleId}`)
  return { success: true }
} 