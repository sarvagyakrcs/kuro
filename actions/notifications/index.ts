"use server"

import { revalidatePath } from "next/cache"
import type { Notification, NotificationType } from "@prisma/client"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/auth"

// Get notifications for the current user with pagination
export async function getNotifications(page = 0, pageSize = 10): Promise<Notification[]> {
  try {
    // In a real app, you would get the user ID from the session
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated")
    }

    const userId = session.user.id ?? "";

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: page * pageSize,
      take: pageSize,
      include: {
        user: {
          select: {
            name: true,
            profilePic: true,
          },
        },
      },
    })

    return notifications
  } catch (error) {
    console.error("Failed to fetch notifications:", error)
    throw new Error("Failed to fetch notifications")
  }
}

// Mark a notification as read
export async function markAsRead(id: string): Promise<void> {
  try {
    await prisma.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    })

    // Revalidate the notifications page
    revalidatePath("/notifications")
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
    throw new Error("Failed to mark notification as read")
  }
}

// Create a new notification (for testing)
export async function createNotification(
  type: NotificationType,
  title: string,
  content: string,
  actionUrl?: string,
): Promise<Notification> {
  try {
    // In a real app, you would get the user ID from the session
    const userId = "user-1" // Mock user ID

    const notification = await prisma.notification.create({
      data: {
        type,
        title,
        content,
        actionUrl,
        userId,
      },
    })

    // Revalidate the notifications page
    revalidatePath("/notifications")

    return notification
  } catch (error) {
    console.error("Failed to create notification:", error)
    throw new Error("Failed to create notification")
  }
}
