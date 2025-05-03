"use client";

import { Bell, CheckCircle2 } from "lucide-react";
import { SparkleIcon } from "@/components/ui/sparkle-icon";
import { Strong, Text } from "@/components/ui/text";

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    content: string;
    read: boolean;
    type: string;
    createdAt: Date;
  };
  markAsReadAction: (id: string) => Promise<any>;
}

export default function NotificationItem({ notification, markAsReadAction }: NotificationItemProps) {
  return (
    <div 
      className={`p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
        !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
      }`}
    >
      <div className="flex gap-3">
        <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
          ${getNotificationTypeColor(notification.type)}`}>
          {getNotificationTypeIcon(notification.type)}
        </div>
        
        <div className="flex-1">
          <div className="mb-1 flex items-start justify-between">
            <Strong className="text-sm font-medium">{notification.title}</Strong>
            {!notification.read && (
              <form action={() => markAsReadAction(notification.id)}>
                <button 
                  type="submit"
                  className="ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors" 
                  title="Mark as read" 
                />
              </form>
            )}
          </div>
          <Text className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-1">
            {notification.content}
          </Text>
          <Text className="text-xs text-zinc-400 dark:text-zinc-500">
            {formatTimeAgo(notification.createdAt)}
          </Text>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getNotificationTypeIcon(type: string) {
  switch (type) {
    case 'CONSTRUCTIVE':
      return <CheckCircle2 className="h-4 w-4 text-white" />;
    case 'DESTRUCTIVE':
      return <Bell className="h-4 w-4 text-white" />;
    case 'URGENT':
      return <Bell className="h-4 w-4 text-white" />;
    case 'INFORMATIVE':
      return <SparkleIcon className="h-4 w-4 text-white" />;
    default:
      return <Bell className="h-4 w-4 text-white" />;
  }
}

function getNotificationTypeColor(type: string) {
  switch (type) {
    case 'CONSTRUCTIVE':
      return 'bg-emerald-500';
    case 'DESTRUCTIVE':
      return 'bg-red-500';
    case 'URGENT':
      return 'bg-amber-500';
    case 'INFORMATIVE':
      return 'bg-blue-500';
    default:
      return 'bg-zinc-500';
  }
}

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  return new Date(date).toLocaleDateString();
} 