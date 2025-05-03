"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const session = await auth();
  if (!session?.user) return;
  
  try {
    await prisma.notification.update({
      where: {
        id: notificationId,
        userId: session.user.id,
      },
      data: {
        read: true,
      },
    });
    
    revalidatePath("/home");
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
} 