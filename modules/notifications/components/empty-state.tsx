"use client";

import { Mail, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/components/ui/sparkle-icon";

export function EmptyState() {
  return (
    <motion.div 
      className="rounded-xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <motion.div 
            className="relative size-24 rounded-full bg-zinc-100 p-5 dark:bg-zinc-800 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Bell className="size-full text-zinc-400" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-700"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.2, 0.7]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          <motion.div
            className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700"
            initial={{ rotate: -15 }}
            animate={{ rotate: 5 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          >
            <SparkleIcon className="size-5" />
          </motion.div>
        </div>
        
        <Heading level={3} className="mb-2.5">All caught up!</Heading>
        
        <Text className="max-w-md mb-6 text-zinc-500 dark:text-zinc-400">
          You don't have any notifications at the moment. When you receive new notifications, they will appear here.
        </Text>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group/btn relative"
        >
          <Button className="relative px-5 py-2.5">
            <span className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>Check again</span>
            </span>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-0 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
} 