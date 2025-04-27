import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Video, Play, Lock } from 'lucide-react';

export interface VideoComponentProps {
  videoUrl?: string;
  title?: string;
  description?: string;
  duration?: string;
  isLocked?: boolean;
  onComplete?: () => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  videoUrl,
  title,
  description,
  duration = "10:00",
  isLocked = false,
  onComplete
}) => {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleStartWatching = () => {
    if (isLocked) return;
    setIsWatching(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          onComplete?.();
          return 100;
        }
        return prev + 0.5;
      });
    }, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  };

  // Rick Roll video ID
  const videoId = 'dQw4w9WgXcQ';

  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="relative">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          {isCompleted && (
            <div className="shrink-0 bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VideoComponent;
