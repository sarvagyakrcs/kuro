
import React from 'react';
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-shimmer bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 bg-[length:400%_100%]", className)}
      {...props}
    />
  );
};

export const CardSkeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div className={cn("rounded-md border border-white/10 overflow-hidden bg-card", className)} {...props}>
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-4/5 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/5 rounded-md" />
        <div className="pt-2">
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div className="flex justify-between gap-2 pt-2">
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const VideoSkeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div className={cn("rounded-md border border-white/10 overflow-hidden bg-card", className)} {...props}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export const QuizSkeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div className={cn("rounded-md border border-white/10 overflow-hidden bg-card", className)} {...props}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-14 w-full rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
        </div>
      </div>
      <div className="p-4 border-t border-white/10">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

export const DashboardSkeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-md" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VideoSkeleton />
          <QuizSkeleton />
        </div>
      </div>
    </div>
  );
};

export default {
  Skeleton,
  CardSkeleton,
  VideoSkeleton,
  QuizSkeleton,
  DashboardSkeleton,
};
