"use client"

import React, { useState } from 'react'
import { Module } from '@prisma/client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SparkleIcon } from '@/components/ui/sparkle-icon'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCompletion } from 'ai/react'
import { saveModuleContent } from '@/actions/course/save-module-content'

type Props = {
  module: Module
}

export default function MdModuleClient({ module }: Props) {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Use the AI SDK completion hook - this handles streaming for us
  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: '/api/generate-md',
    body: { moduleId: module.id },
  })
  
  // Initiate content generation if there's no content already
  React.useEffect(() => {
    if (!module.content && !completion && !isLoading) {
      complete('')
    } else if (module.content) {
      setCompletion(module.content)
    }
  }, [module.id, module.content, completion, isLoading, complete, setCompletion])
  
  // Handle saving the content
  async function handleSave() {
    if (!completion) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      const result = await saveModuleContent(module.id, completion)
      if (!result.success) {
        throw new Error(result.error || 'Failed to save content')
      }
      window.location.reload()
    } catch (err) {
      console.error('Error saving content:', err)
      setError(err instanceof Error ? err.message : 'Failed to save content')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Display content from module or streamed completion
  const displayContent = module.content || completion
  
  return (
    <div suppressHydrationWarning className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <SparkleIcon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{module.name}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="text-sm text-indigo-500 flex items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
            </div>
          )}
          
          {!module.content && completion && !isLoading && (
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-1 px-2 h-8"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save to Database</span>
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6 md:p-8 overflow-auto">
        {!displayContent && isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Generating markdown content...</p>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-white" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-zinc-900 dark:text-white" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed" {...props} />,
              a: ({ node, ...props }) => <a className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 underline decoration-1 underline-offset-2" {...props} />,
              ul: ({ node, ...props }) => <ul className="mb-6 list-disc pl-6 text-zinc-700 dark:text-zinc-300" {...props} />,
              ol: ({ node, ...props }) => <ol className="mb-6 list-decimal pl-6 text-zinc-700 dark:text-zinc-300" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              // Code blocks - handle separately to avoid nesting in <p>
              code: ({ node, inline, className, children, ...props }: any) => {
                // For inline code, no nesting issues
                if (inline) {
                  return <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-pink-500 dark:text-pink-400 font-mono text-sm" {...props}>{children}</code>
                }
                
                // For code blocks, return directly without nesting
                return (
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md overflow-auto my-4 not-prose">
                    <code className="font-mono text-sm text-zinc-800 dark:text-zinc-200 block" {...props}>{children}</code>
                  </div>
                )
              },
              // Use the "pre" renderer to prevent it from being used within paragraphs
              pre: ({ node, ...props }) => {
                // Just render the children directly, our code handler above will style it
                return <>{props.children}</>
              },
              table: ({ node, ...props }) => <div className="overflow-x-auto mb-6"><table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800" {...props} /></div>,
              thead: ({ node, ...props }) => <thead className="bg-zinc-50 dark:bg-zinc-800/50" {...props} />,
              tbody: ({ node, ...props }) => <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800" {...props} />,
              tr: ({ node, ...props }) => <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30" {...props} />,
              th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" {...props} />,
              td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300" {...props} />,
            }}
          >
            {displayContent || ''}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
} 