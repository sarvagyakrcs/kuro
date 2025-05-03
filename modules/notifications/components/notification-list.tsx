"use client"

import { useCallback, useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import NotificationItem from "./notification-item"
import NotificationsLoading, { NotificationsLoadingInline } from "./notifications-loading"
import { Divider } from "@/components/ui/divider"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"
import { SparkleIcon } from "@/components/ui/sparkle-icon"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import { markAsRead, getNotifications } from "@/actions/notifications"
import { EmptyState } from "./empty-state"

const NOTIFICATIONS_PER_PAGE = 10

export default function NotificationsList() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam = 0 }) => {
      const notifications = await getNotifications(pageParam, NOTIFICATIONS_PER_PAGE)
      return notifications
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === NOTIFICATIONS_PER_PAGE ? allPages.length : undefined
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleMarkAsRead = useCallback(
    async (id: string) => {
      try {
        // Optimistic update
        await markAsRead(id)
        // Refetch to ensure data consistency
        refetch()
      } catch (error) {
        toast.error("Failed to mark notification as read")
      }
    },
    [refetch],
  )

  const allNotifications = data?.pages.flatMap(page => page) || []
  const unreadCount = allNotifications.filter(n => !n.read).length

  // Show loading skeleton during initial load
  if (isLoading) {
    return <NotificationsLoading />
  }

  // Show loading skeleton when refetching with no previous data
  if (isFetching && (!data || data.pages.length === 0)) {
    return <NotificationsLoading />
  }

  if (!allNotifications || allNotifications.length === 0) {
    return <EmptyState />
  }

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge color="blue" className="mb-2">
            <SparkleIcon className="mr-1 size-4" />
            <span>Activity</span>
          </Badge>
          <Heading className="text-2xl font-bold">Your Notifications</Heading>
          <Text>Stay updated with your latest notifications</Text>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge color="red" className="rounded-full px-4 py-1.5">
              {unreadCount} unread
            </Badge>
          )}
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            onClick={() => refetch()}
            className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            aria-label="Refresh notifications"
          >
            <RefreshCw className="size-5" />
          </motion.button>
        </div>
      </div>

      <Divider />

      {/* Show a loading bar at the top when refetching with existing data */}
      {isFetching && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mx-auto h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
        >
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ 
              width: ["0%", "50%", "70%", "90%"],
              transition: { duration: 1, ease: "easeInOut" }
            }}
          />
        </motion.div>
      )}
      
      <motion.div 
        className="grid gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {allNotifications.map((notification, index) => (
            <motion.div 
              key={notification.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <NotificationItem 
                notification={notification} 
                onMarkAsRead={handleMarkAsRead} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasNextPage && (
        <div 
          ref={loadMoreRef} 
          className="mt-4 flex justify-center"
        >
          {isFetchingNextPage && <NotificationsLoadingInline />}
        </div>
      )}
    </div>
  )
}
