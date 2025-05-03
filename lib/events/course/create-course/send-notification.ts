import { prisma } from "@/lib/db/prisma"
import { Event } from "@/models/Event"
import { revalidatePath } from "next/cache"

const sendNotification = async (userId: string, courseName: string) => {
    const notification = await prisma.notification.create({
        data: {
            userId,
            content: `You have created a new course: ${courseName}`,
            title: "Course Created",
            type: "INFORMATIVE"
        }
    })

    revalidatePath("/notifications")
}

export const sendNotificationEvent = new Event("sendNotification", "sendNotification", "send notification after course creation", sendNotification)