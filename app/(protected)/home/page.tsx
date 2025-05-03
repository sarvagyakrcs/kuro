"use server";
import { auth } from "@/auth";
import React, { Suspense } from "react";
import { Text, Strong } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/components/ui/sparkle-icon";
import { 
  BookOpen, 
  Bell, 
  GraduationCap, 
  Clock, 
  LineChart, 
  CheckCircle2, 
  ChevronRight, 
  LayoutDashboard, 
  CircleUser
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationItem from "./components/notification-item";
import { markNotificationAsRead } from "./actions";

// Dashboard Components with Data Fetching
async function StatsCards() {
  const session = await auth();
  if (!session?.user) return null;
  
  // Fetch count data
  const courseCount = await prisma.userCourse.count({
    where: { userId: session.user.id }
  });
  
  const unreadCount = await prisma.notification.count({
    where: {
      userId: session.user.id,
      read: false
    }
  });

  const userCourses = await prisma.userCourse.findMany({
    where: { userId: session.user.id },
    take: 1,
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <Text className="text-sm text-zinc-500 dark:text-zinc-400">My Courses</Text>
            <Strong className="text-2xl">{courseCount}</Strong>
          </div>
        </div>
        <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
      </div>
      
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
            <LineChart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <Text className="text-sm text-zinc-500 dark:text-zinc-400">Course Progress</Text>
            <Strong className="text-2xl">{userCourses.length > 0 ? "In Progress" : "Not Started"}</Strong>
          </div>
        </div>
        <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
      </div>
      
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
            <Bell className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <Text className="text-sm text-zinc-500 dark:text-zinc-400">Notifications</Text>
            <Strong className="text-2xl">{unreadCount} unread</Strong>
          </div>
        </div>
        <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
      </div>
    </div>
  );
}

// Skeleton loaders
function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function RecentCourses() {
  const session = await auth();
  if (!session?.user) return null;
  
  const userCourses = await prisma.userCourse.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      course: {
        include: {
          modules: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    },
    take: 3
  });
  
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge color="emerald" className="mb-1">
            <BookOpen className="mr-1 h-4 w-4" />
            <span>My Learning</span>
          </Badge>
          <Heading level={3} className="text-xl font-bold">Recent Courses</Heading>
        </div>
        <Link href="/courses">
          <span className="text-sm text-primary hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
      
      <div className="space-y-4">
        {userCourses.length > 0 ? (
          userCourses.map((userCourse) => (
            <div 
              key={userCourse.id}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-sky-300 to-blue-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {userCourse.course.modules[0]?.thumbnailUrl ? (
                  <div className="w-full sm:w-32 h-24 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <img 
                      src={userCourse.course.modules[0].thumbnailUrl} 
                      alt={userCourse.course.name}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="flex w-full sm:w-32 h-24 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <BookOpen className="h-8 w-8 text-zinc-400" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="mb-2">
                    <Heading level={4} className="font-semibold text-lg">
                      {userCourse.course.name}
                    </Heading>
                    <Text className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {userCourse.course.description || "No description available"}
                    </Text>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={14} />
                        <span>{userCourse.course.modules.length} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Last updated {new Date(userCourse.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Button href={`/courses/${userCourse.courseId}`} color="light" className="h-8 px-3 text-xs">
                      Continue <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <BookOpen className="h-8 w-8 text-zinc-400" />
            </div>
            <Heading level={3} className="mb-2 text-lg">No courses yet</Heading>
            <Text className="max-w-md mb-6 text-sm text-zinc-500 dark:text-zinc-400">
              You haven't enrolled in any courses yet. Browse our catalog to get started.
            </Text>
            <Button href="/courses" color="sky">
              <span>Browse Courses</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function RecentCoursesSkeleton() {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-7 w-44" />
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="w-full sm:w-32 h-24 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-full max-w-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function NotificationsPanel() {
  const session = await auth();
  if (!session?.user) return null;
  
  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge color="amber" className="mb-1">
            <Bell className="mr-1 h-4 w-4" />
            <span>Updates</span>
          </Badge>
          <Heading level={3} className="text-xl font-bold">Recent Notifications</Heading>
        </div>
        <Link href="/notifications">
          <span className="text-sm text-primary hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
      
      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {notifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                markAsReadAction={markNotificationAsRead}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center p-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Bell className="h-6 w-6 text-zinc-400" />
            </div>
            <Heading level={4} className="mb-1 text-base">No notifications</Heading>
            <Text className="text-sm text-zinc-500 dark:text-zinc-400">
              You don't have any notifications yet
            </Text>
          </div>
        )}
      </div>
      
      {/* User Profile Card */}
      <UserProfileCard />
    </div>
  );
}

function NotificationsPanelSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
      
      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 overflow-hidden">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4">
              <div className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}

async function UserProfileCard() {
  const session = await auth();
  if (!session?.user) return null;
  
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          {session.user.image ? (
            <img 
              src={session.user.image} 
              alt={session.user.name || 'Profile'} 
              className="h-full w-full object-cover"
            />
          ) : (
            <CircleUser className="h-8 w-8 text-zinc-400" />
          )}
        </div>
        
        <div className="flex-1 space-y-1">
          <Heading level={4} className="font-medium">
            {session.user.name || 'User'}
          </Heading>
          <Text className="text-xs text-zinc-500 dark:text-zinc-400">
            {session.user.email}
          </Text>
        </div>
        
        <Button href="/profile" color="sky" className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Main Dashboard Component
const HomePage = async () => {
  const session = await auth();
  
  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header - Render immediately without Suspense */}
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge color="blue" className="mb-2">
            <LayoutDashboard className="mr-1 h-4 w-4" />
            <span>Dashboard</span>
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Heading className="text-2xl sm:text-3xl font-bold">
              Welcome back, {session.user.name || 'User'}!
            </Heading>
            <Text className="text-zinc-500 dark:text-zinc-400 mt-1">
              Here's an overview of your courses and recent activity
            </Text>
          </div>
          <div className="flex gap-3">
            <Button href="/courses" color="sky">
              Browse Courses
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <Divider />
      
      {/* Stats Cards - Load with Suspense */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses - Load with Suspense */}
        <Suspense fallback={<RecentCoursesSkeleton />}>
          <RecentCourses />
        </Suspense>
        
        {/* Notifications Panel - Load with Suspense */}
        <Suspense fallback={<NotificationsPanelSkeleton />}>
          <NotificationsPanel />
        </Suspense>
      </div>
    </div>
  );
};

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

export default HomePage;
