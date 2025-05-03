"use client"

import { Module, ModuleType } from '@prisma/client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heading, Subheading } from '@/components/ui/heading'
import { Badge } from '@/components/ui/badge'
import { Text, Strong } from '@/components/ui/text'
import { Divider } from '@/components/ui/divider'
import { SparkleIcon } from '@/components/ui/sparkle-icon'
import { Play, Clock, FileText, CheckCircle2, BookOpen, ChevronRight, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
    modules: Module[]
}

const CourseList = ({ modules }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (modules.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white/50 p-8 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-4 size-20 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
            <BookOpen className="size-full text-zinc-500" />
            <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
              <SparkleIcon className="size-4" />
            </span>
          </div>
          <Heading level={3} className="mb-2">No modules yet</Heading>
          <Text className="max-w-md mb-6">Your course doesn't have any modules at the moment. Check back later or contact your instructor for more information.</Text>
          <Button>
            <span>Refresh</span>
            <span className="ml-2 size-5 text-zinc-400">↻</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge color="blue" className="mb-2">
            <SparkleIcon className="mr-1 size-4" />
            <span>Course Content</span>
          </Badge>
          <Heading className="text-xl font-bold">Course Modules</Heading>
          <Text>Complete all {modules.length} modules to finish this course</Text>
        </div>
        <Badge color="zinc" className="rounded-full px-4 py-1.5 text-sm">
          {modules.length} {modules.length === 1 ? 'Module' : 'Modules'}
        </Badge>
      </div>

      <Divider />

      <div className="grid gap-4">
        {modules.map((module, index) => {
          const isHovered = hoveredIndex === index;
          const moduleIcon = getModuleIcon(module.moduleType);

          return (
            <motion.div 
              key={module.id}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background animations */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <div 
                  className={`absolute -inset-0.5 bg-gradient-to-r ${getModuleGradient(module.moduleType)} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20`}
                />
              </div>

              <div className="relative flex items-start gap-4 p-4">
                {/* Module number with animated circle */}
                <div className="relative flex-shrink-0">
                  <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Strong className="text-lg">{index + 1}</Strong>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/40"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  {/* Type icon */}
                  <div className={`absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full ${getModuleBgColor(module.moduleType)}`}>
                    {moduleIcon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <Heading level={4} className="font-semibold">
                      {module.name}
                    </Heading>
                    <Badge color={getModuleBadgeColor(module.moduleType)}>
                      {module.moduleType}
                    </Badge>
                  </div>
                  
                  {module.description && (
                    <Text className="mb-3 line-clamp-2">{module.description}</Text>
                  )}
                  
                  <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{new Date(module.createdAt).toLocaleDateString()}</span>
                    </div>
                    {module.videoUrl && (
                      <div className="flex items-center gap-1">
                        <Play size={14} />
                        <span>Video Available</span>
                      </div>
                    )}
                    {module.thumbnailUrl && (
                      <div className="flex items-center gap-1">
                        <FileText size={14} />
                        <span>Preview Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action button with hover effect */}
                <div className="ml-2 flex-shrink-0 self-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative"
                  >
                    <Button color='sky' className="relative rounded-full px-4 py-2">
                      <span className="flex items-center gap-1.5">
                        Open <ChevronRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

// Helper functions
const getModuleIcon = (moduleType: ModuleType) => {
  switch (moduleType) {
    case 'VIDEO':
      return <Play className="size-4 text-white" />;
    case 'TEXT':
      return <FileText className="size-4 text-white" />;
    case 'QUIZ':
      return <CheckCircle2 className="size-4 text-white" />;
    case 'MD':
      return <BookOpen className="size-4 text-white" />;
    case 'CHART':
      return <BarChart2 className="size-4 text-white" />;
    default:
      return <FileText className="size-4 text-white" />;
  }
};

const getModuleBadgeColor = (moduleType: ModuleType): "blue" | "red" | "zinc" | "purple" | "green" => {
  switch (moduleType) {
    case 'VIDEO':
      return 'blue';
    case 'QUIZ':
      return 'red';
    case 'TEXT':
      return 'zinc';
    case 'MD':
      return 'purple';
    case 'CHART':
      return 'green';
    default:
      return 'zinc';
  }
};

const getModuleBgColor = (moduleType: ModuleType): string => {
  switch (moduleType) {
    case 'VIDEO':
      return 'bg-blue-500';
    case 'QUIZ':
      return 'bg-red-500';
    case 'TEXT':
      return 'bg-zinc-700';
    case 'MD':
      return 'bg-purple-500';
    case 'CHART':
      return 'bg-green-500';
    default:
      return 'bg-zinc-700';
  }
};

const getModuleGradient = (moduleType: ModuleType): string => {
  switch (moduleType) {
    case 'VIDEO':
      return 'from-blue-500 via-sky-300 to-blue-500';
    case 'QUIZ':
      return 'from-red-500 via-rose-300 to-red-500';
    case 'TEXT':
      return 'from-zinc-500 via-zinc-300 to-zinc-500';
    case 'MD':
      return 'from-purple-500 via-violet-300 to-purple-500';
    case 'CHART':
      return 'from-green-500 via-emerald-300 to-green-500';
    default:
      return 'from-zinc-500 via-zinc-300 to-zinc-500';
  }
};

export default CourseList;