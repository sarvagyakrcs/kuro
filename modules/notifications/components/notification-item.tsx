"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FormattedDate } from "@/components/ui/formatted-date"
import { Check, AlertTriangle, Info, Bell, X, ChevronRight } from "lucide-react"
import { type Notification } from "@prisma/client"
import { motion } from "framer-motion"
import { Text, Strong } from "@/components/ui/text"

// Define the enum manually to avoid server/client mismatch
enum NotificationType {
  CONSTRUCTIVE = "CONSTRUCTIVE",
  DESTRUCTIVE = "DESTRUCTIVE",
  URGENT = "URGENT",
  INFORMATIVE = "INFORMATIVE"
}

interface NotificationItemProps {
  notification: Notification & {
    user?: {
      name: string
      profilePic: string | null
    }
  }
  onMarkAsRead: (id: string) => Promise<void>
}

const typeConfig = {
  [NotificationType.CONSTRUCTIVE]: {
    icon: Info,
    color: "green",
    label: "Constructive",
    bgClass: "bg-green-50 dark:bg-green-900/10",
    ringColor: "ring-green-500/20",
    gradientClass: "from-green-500 via-emerald-300 to-green-500",
    iconBgClass: "bg-green-500",
  },
  [NotificationType.DESTRUCTIVE]: {
    icon: X,
    color: "red",
    label: "Destructive",
    bgClass: "bg-red-50 dark:bg-red-900/10",
    ringColor: "ring-red-500/20",
    gradientClass: "from-red-500 via-rose-300 to-red-500",
    iconBgClass: "bg-red-500",
  },
  [NotificationType.URGENT]: {
    icon: AlertTriangle,
    color: "orange",
    label: "Urgent",
    bgClass: "bg-orange-50 dark:bg-orange-900/10",
    ringColor: "ring-orange-500/20",
    gradientClass: "from-orange-500 via-amber-300 to-orange-500",
    iconBgClass: "bg-orange-500",
  },
  [NotificationType.INFORMATIVE]: {
    icon: Bell,
    color: "blue",
    label: "Informative",
    bgClass: "bg-blue-50 dark:bg-blue-900/10",
    ringColor: "ring-blue-500/20",
    gradientClass: "from-blue-500 via-sky-300 to-blue-500",
    iconBgClass: "bg-blue-500",
  },
}

export default function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.read)
  const [isHovered, setIsHovered] = useState(false)

  const handleMarkAsRead = async () => {
    if (isRead) return

    // Optimistic update
    setIsRead(true)

    try {
      await onMarkAsRead(notification.id)
    } catch (error) {
      setIsRead(false)
    }
  }

  const config = typeConfig[notification.type as NotificationType] || typeConfig[NotificationType.INFORMATIVE]
  const Icon = config.icon

  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl border p-1 transition-all duration-300 hover:shadow-md ${
        isRead 
          ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700" 
          : `border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 ring-2 ${config.ringColor}`
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background animations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r ${config.gradientClass} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20`}
        />
      </div>

      <div className="relative p-4 flex items-start gap-4">
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <div className={`flex size-12 items-center justify-center rounded-full ${isRead ? 'bg-zinc-100 dark:bg-zinc-800' : config.bgClass}`}>
            <Icon className="size-6 text-foreground" />
            {isHovered && !isRead && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>
          <div className={`absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full ${config.iconBgClass}`}>
            <Icon className="size-3 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Strong className="font-medium">{notification.title}</Strong>
              <Badge color={config.color as any} className="rounded-full px-2 py-0.5 text-xs">
                {config.label}
              </Badge>
            </div>
            <FormattedDate date={notification.createdAt} className="text-xs text-muted-foreground" />
          </div>
          <Text className="text-sm text-muted-foreground">{notification.content}</Text>
          {notification.actionUrl && (
            <div className="pt-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn relative inline-block"
              >
                <Button className="rounded-full px-3 py-1 h-auto text-xs font-medium relative">
                  <span className="flex items-center gap-1">
                    View Details <ChevronRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </span>
                  <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        {/* Mark as read button */}
        {!isRead && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              onClick={handleMarkAsRead} 
              className="ml-2 size-9 p-0 rounded-full flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300"
            >
              <span className="sr-only">Mark as read</span>
              <Check className="size-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
