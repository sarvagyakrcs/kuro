"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { SparkleIcon } from '@/components/ui/sparkle-icon'
import { Text } from '@/components/ui/text'
import { Module } from '@prisma/client'
import { ChevronLeft, Play } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    module: Module
}

// Function to transform YouTube URLs properly
const getEmbedUrl = (url: string) => {
    try {
      // Handle YouTube links
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Extract video ID
        let videoId;
        if (url.includes('watch?v=')) {
          videoId = new URL(url).searchParams.get('v');
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/embed/')) {
          return url; // Already an embed URL
        }
        
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      // Return original URL if not YouTube or couldn't parse
      return url;
    } catch (e) {
      console.error("Error parsing video URL:", e);
      return url;
    }
  };

const VideoModuleClient = ({ module }: Props) => {
  const [videoError, setVideoError] = useState(false);
  const embedUrl = getEmbedUrl(module.videoUrl || "");

  return (
    <div className="space-y-4">
      {module.videoUrl && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <Badge color="blue" className="mb-1 sm:mb-2">
                  <SparkleIcon className="mr-1 size-3 sm:size-4" />
                  <span>Video Content</span>
                </Badge>
                <Heading level={2} className="text-base sm:text-xl font-bold">{module.name}</Heading>
              </div>
              <Badge color="zinc" className="self-start rounded-full px-2 sm:px-3 py-1 text-xs">
                <Play className="mr-1 size-3" />
                <span>Video</span>
              </Badge>
            </div>

            {/* Video container with absolutely no animations */}
            <div className="w-full rounded-lg overflow-hidden shadow-md bg-black">
              <div className="relative pb-[56.25%] w-full">
                {videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <div className="text-center p-4">
                      <p className="text-red-500 font-medium">Unable to load video</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Please check the video URL and try again</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={embedUrl}
                    title={`${module.name} video`}
                    frameBorder="0"
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onError={() => setVideoError(true)}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0 pt-2">
              <Text className="text-xs sm:text-sm text-muted-foreground">Watch the complete video to understand the key concepts.</Text>
              <div className="self-end sm:self-auto">
                <Button href={`/home`} color="sky" className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    Back <ChevronLeft size={16} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoModuleClient