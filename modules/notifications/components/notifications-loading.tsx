"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Info, Clock, ChevronRight } from "lucide-react";
import { Divider } from "@/components/ui/divider";

export default function NotificationsLoading() {
  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-14" />
            </div>
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-52 mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-full" />
          </div>
        </div>

        <Divider className="my-1" />
        
        {/* Subtle progress indicator */}
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div 
            className="h-full bg-primary/30"
            animate={{ 
              width: ["0%", "30%", "70%", "90%", "100%"],
              opacity: [0.7, 0.5, 0.7, 0.5, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </div>
      </div>
      
      {/* Notification items with varying sizes to look more realistic */}
      <motion.div 
        className="grid gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          // Alternate item styles to create visual variety
          const isUnread = index === 0 || index === 2;
          const hasActionButton = index === 0 || index === 3;
          const hasViewDetails = index === 1 || index === 2;
          const itemLength = index === 0 ? 'long' : index === 1 ? 'medium' : index === 2 ? 'short' : 'medium';
          
          const typeStyles = [
            { icon: Bell, color: "bg-blue-500", bgColor: "bg-blue-50/80 dark:bg-blue-900/10" },
            { icon: AlertTriangle, color: "bg-red-500", bgColor: "bg-red-50/80 dark:bg-red-900/10" },
            { icon: Info, color: "bg-green-500", bgColor: "bg-green-50/80 dark:bg-green-900/10" },
            { icon: Clock, color: "bg-orange-500", bgColor: "bg-orange-50/80 dark:bg-orange-900/10" }
          ][index % 4];
          
          const Icon = typeStyles.icon;
          
          return (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/70 ${isUnread ? "ring-1 ring-blue-500/20" : ""}`}
            >
              {/* Subtle shimmer effect */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/10 to-transparent opacity-0"
                  animate={{ 
                    opacity: [0, 0.07, 0],
                    x: ["-100%", "100%"]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              </div>
              
              <div className="p-3.5 flex gap-3 items-start">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`flex size-10 items-center justify-center rounded-full ${isUnread ? typeStyles.bgColor : "bg-zinc-100 dark:bg-zinc-800"}`}>
                    <Skeleton className="h-5 w-5 rounded opacity-70" />
                  </div>
                  <div className={`absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full ${typeStyles.color}`}>
                    <Icon className="size-3 text-white opacity-70" />
                  </div>
                </div>
                
                {/* Content - with varying lengths */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Skeleton className={`h-4 ${itemLength === 'long' ? 'w-28' : itemLength === 'medium' ? 'w-24' : 'w-20'}`} />
                      <Skeleton className="h-4 w-14 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-16 flex-shrink-0" />
                  </div>
                  
                  <Skeleton className={`h-3.5 ${itemLength === 'long' ? 'w-[95%]' : itemLength === 'medium' ? 'w-[90%]' : 'w-[85%]'}`} />
                  {itemLength !== 'short' && <Skeleton className={`h-3.5 ${itemLength === 'long' ? 'w-[80%]' : 'w-[70%]'}`} />}
                  
                  {hasViewDetails && (
                    <div className="pt-1.5">
                      <div className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                        <Skeleton className="h-3.5 w-14 rounded-full" />
                        <ChevronRight className="ml-1 size-3 text-zinc-400" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action button */}
                {hasActionButton && (
                  <div className="flex-shrink-0 self-start">
                    <Skeleton className="size-7 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Loading indicator */}
        <div className="flex justify-center py-2">
          <div className="flex items-center gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary/60"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function NotificationsLoadingInline() {
  return (
    <div className="py-3 flex justify-center">
      <div className="flex items-center gap-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/60"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay
            }}
          />
        ))}
      </div>
    </div>
  );
}
