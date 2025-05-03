"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/db/prisma"
import { redis } from "@/lib/redis"

export const getCourseModules = async (courseId: string) => {
    const session = await auth()
    if (!session) {
        throw new Error("Unauthorized")
    }

    const redisKey = `course-modules-${courseId}`
    const cachedModules = await redis.get(redisKey)

    if (cachedModules) {
        console.log("cache hit")
        return JSON.parse(cachedModules)
    }
    console.log("cache miss")
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            modules: true
        }
    })
    redis.set(redisKey, JSON.stringify(course?.modules))
    return course?.modules
}