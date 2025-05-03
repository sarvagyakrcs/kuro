"use client"

import { Badge } from "@/components/ui/badge"
import { Divider } from "@/components/ui/divider"
import { Skeleton } from "@/components/ui/skeleton"
import { InboxIcon } from "lucide-react"

export default function NotificationsLoading() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="mb-2">
            <Badge color="blue" className="opacity-70">
              <InboxIcon className="mr-1 h-4 w-4" />
              <span>Notifications</span>
            </Badge>
          </div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-72 mt-1" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <Divider />

      {/* Simple loading indicator */}
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full w-1/3 bg-primary rounded-full animate-pulse" />
      </div>

      {/* Notification items */}
      <div className="grid gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900/70"
          >
            <div className="flex gap-3 items-start">
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NotificationsLoadingInline() {
  return (
    <div className="py-3 flex justify-center">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}