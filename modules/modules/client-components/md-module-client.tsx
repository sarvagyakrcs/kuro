"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Module } from '@prisma/client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SparkleIcon } from '@/components/ui/sparkle-icon'
import { Button } from '@/components/ui/button'
import { useCompletion } from 'ai/react'
import { saveModuleContent } from '@/actions/course/save-module-content'

type Props = {
  module: Module
}

const MdModuleClient = ({ module }: Props) => {
  const [content, setContent] = useState<string>(module.content || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const generationAttemptedRef = useRef(false)
  
  const { complete, completion, isLoading, setCompletion } = useCompletion({
    api: '/api/completion',
    body: {
      moduleId: module.id
    },
    onResponse: () => {
      console.log('AI response started streaming')
    },
    onFinish: async (completion) => {
      console.log('Generation finished, saving content to database')
      
      // Only save if we have completion content and the module doesn't already have content
      if (completion && completion.trim() !== '') {
        setIsSaving(true)
        setSaveError(null)
        
        try {
          const result = await saveModuleContent(module.id, completion)
          if (!result.success) {
            console.error('Failed to save content:', result.error)
            setSaveError('Failed to save content to database')
          } else {
            setContent(completion)
            console.log('Content saved successfully')
          }
        } catch (error) {
          console.error('Error saving content:', error)
          setSaveError('Error saving content to database')
        } finally {
          setIsSaving(false)
        }
      } else {
        console.warn('No content to save')
      }
    }
  })

  // If module already has content, use it
  useEffect(() => {
    if (module.content && !completion) {
      console.log('Using existing module content')
      setCompletion(module.content)
    }
  }, [module.content, completion, setCompletion])

  // Only trigger generation once if module has no content
  useEffect(() => {
    // Only generate content if module doesn't have content already
    if (!module.content && !generationAttemptedRef.current && !isLoading && !completion) {
      console.log('Triggering content generation')
      generationAttemptedRef.current = true
      complete("")
    }
  }, [module.content, isLoading, completion, complete])

  // Use streamed text if available, otherwise use stored content
  const markdown = completion || content || 'Generating detailed notes...'

  return (
    <div suppressHydrationWarning className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <SparkleIcon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{ module.name }</h2>
        </div>
        {(isLoading || isSaving) && (
          <div className="text-sm text-indigo-500 flex items-center gap-1">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isLoading ? 'Generating content...' : 'Saving content...'}
          </div>
        )}
      </div>
      
      {saveError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400">{saveError}</p>
        </div>
      )}
      
      <div className="p-6 md:p-8 overflow-auto">
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
            li: ({ node, ...props }) => <li className="mb-1 marker:text-indigo-500" {...props} />,
            img: ({ node, ...props }) => (
              <div className="my-6 overflow-hidden rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                <img className="w-full" {...props} />
              </div>
            ),
            pre: (preProps) => {
              const {className, children, ...rest} = preProps as any;
              
              let language = '';
              if (children && typeof children === 'object' && React.isValidElement(children)) {
                const childElement = children as React.ReactElement<{className?: string}>;
                const codeClassName = childElement.props.className || '';
                const match = /language-(\w+)/.exec(codeClassName);
                language = match ? match[1] : 'code';
              }
              
              return (
                <div className="my-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                  {language && (
                    <div className="bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                      {language}
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 text-sm" {...rest}>
                    {children}
                  </pre>
                </div>
              );
            },
            code: (props) => {
              const {className, children, ...rest} = props as any;
              
              if ((props as any).inline) {
                return <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-sm" {...rest}>{children}</code>
              }
              
              return <code className="font-mono block" {...rest}>{children}</code>
            },
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-200 dark:border-indigo-900/50 pl-4 italic text-zinc-700 dark:text-zinc-300 my-4" {...props} />,
            hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
            table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
            thead: ({ node, ...props }) => <thead className="bg-zinc-50 dark:bg-zinc-800" {...props} />,
            tbody: ({ node, ...props }) => <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800" {...props} />,
            tr: ({ node, ...props }) => <tr className="border-b border-zinc-200 dark:border-zinc-800" {...props} />,
            th: ({ node, ...props }) => <th className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300" {...props} />,
            td: ({ node, ...props }) => <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
      
      <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-sm text-zinc-500 dark:text-zinc-400 flex justify-between">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <Button color='sky'>
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            Back to top
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MdModuleClient; 