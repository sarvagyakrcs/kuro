"use server"

import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

/**
 * Server action to update module video URL without revalidation
 */
export async function updateModuleVideo(moduleId: string, videoUrl: string) {
  await prisma.module.update({
    where: { id: moduleId },
    data: { videoUrl }
  })
  
  return { success: true, moduleId }
}

/**
 * Separate action to handle path revalidation outside of rendering
 */
export async function revalidateModule(moduleId: string) {
  "use server"
  revalidatePath(`/modules/${moduleId}`)
  return { success: true }
} 