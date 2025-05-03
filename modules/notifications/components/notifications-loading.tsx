"use client"

import { Badge } from "@/components/ui/badge"
import { Divider } from "@/components/ui/divider"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { motion } from "framer-motion"
import { Bell, AlertTriangle, Info, Clock, ChevronRight, SparkleIcon, RefreshCw } from "lucide-react"

export default function NotificationsLoading() {
  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge color="blue" className="mb-2">
            <SparkleIcon className="mr-1 size-4" />
            <span>Activity</span>
          </Badge>
          <h2 className="text-2xl font-bold">Your Notifications</h2>
          <Text>Stay updated with your latest notifications</Text>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            aria-label="Refresh notifications"
          >
            <RefreshCw className="size-5" />
          </motion.button>
        </div>
      </div>

      <Divider />

      {/* Subtle progress indicator */}
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <motion.div
          className="h-full bg-primary/30"
          initial={{ width: "0%" }}
          animate={{
            width: ["0%", "30%", "70%", "90%", "100%"],
            opacity: [0.7, 0.5, 0.7, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      {/* Notification items with varying sizes to look more realistic */}
      <div className="grid gap-3">
        {Array.from({ length: 4 }).map((_, index) => {
          // Alternate item styles to create visual variety
          const isUnread = index === 0 || index === 2
          const hasActionButton = index === 0 || index === 3
          const hasViewDetails = index === 1 || index === 2
          const itemLength = index === 0 ? "long" : index === 1 ? "medium" : index === 2 ? "short" : "medium"

          const typeStyles = [
            { icon: Bell, color: "bg-blue-500", bgColor: "bg-blue-50/80 dark:bg-blue-900/10" },
            { icon: AlertTriangle, color: "bg-red-500", bgColor: "bg-red-50/80 dark:bg-red-900/10" },
            { icon: Info, color: "bg-green-500", bgColor: "bg-green-50/80 dark:bg-green-900/10" },
            { icon: Clock, color: "bg-orange-500", bgColor: "bg-orange-50/80 dark:bg-orange-900/10" },
          ][index % 4]

          const Icon = typeStyles.icon

          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 ${isUnread ? "ring-1 ring-blue-500/20" : ""}`}
            >
              {/* Subtle shimmer effect */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/10 to-transparent"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{
                    opacity: [0, 0.07, 0],
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                  }}
                />
              </div>

              <div className="p-3.5 flex gap-3 items-start">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full ${isUnread ? typeStyles.bgColor : "bg-zinc-100 dark:bg-zinc-800"}`}
                  >
                    <Skeleton className="h-5 w-5 rounded opacity-70" />
                  </div>
                  <div
                    className={`absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full ${typeStyles.color}`}
                  >
                    <Icon className="h-3 w-3 text-white opacity-70" />
                  </div>
                </div>

                {/* Content - with varying lengths */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Skeleton
                        className={`h-4 ${itemLength === "long" ? "w-28" : itemLength === "medium" ? "w-24" : "w-20"}`}
                      />
                      <Skeleton className="h-4 w-14 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-16 flex-shrink-0" />
                  </div>

                  <Skeleton
                    className={`h-3.5 ${itemLength === "long" ? "w-[95%]" : itemLength === "medium" ? "w-[90%]" : "w-[85%]"}`}
                  />
                  {itemLength !== "short" && (
                    <Skeleton className={`h-3.5 ${itemLength === "long" ? "w-[80%]" : "w-[70%]"}`} />
                  )}

                  {hasViewDetails && (
                    <div className="pt-1.5">
                      <div className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                        <Skeleton className="h-3.5 w-14 rounded-full" />
                        <ChevronRight className="ml-1 h-3 w-3 text-zinc-400" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action button */}
                {hasActionButton && (
                  <div className="flex-shrink-0 self-start">
                    <Skeleton className="h-7 w-7 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Loading indicator */}
        <div className="flex justify-center py-2">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export function NotificationsLoadingInline() {
  return (
    <div className="py-3 flex justify-center">
      <LoadingDots />
    </div>
  )
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary/60"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay,
          }}
        />
      ))}
    </div>
  )
}