import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileQuestion, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  videos: number;
  quizzes: number;
  imageUrl?: string;
  isNew?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  progress,
  modules,
  videos,
  quizzes,
  imageUrl,
  isNew = false
}) => {
  return (
    <Link to={`/course/${id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative">
          {imageUrl ? (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          ) : (
            <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary/40" />
            </div>
          )}
          
          {isNew && (
            <Badge 
              variant="outline" 
              className="absolute top-3 right-3 bg-primary/10 text-primary border-primary/20 backdrop-blur-md"
            >
              New
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="mb-3">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors duration-200">{title}</h3>
            <p className="text-sm text-muted-foreground/80 line-clamp-2 mt-1.5">{description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground/80">Course Progress</span>
                <span className="font-medium text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-1.5 bg-primary/10" 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-2">
              <div className="flex flex-col items-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <BookOpen className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground/80">{modules} modules</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <Video className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground/80">{videos} videos</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <FileQuestion className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground/80">{quizzes} quizzes</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 border-t border-white/5">
          <Button 
            variant="ghost" 
            className="w-full justify-between text-muted-foreground hover:text-primary group-hover:text-primary transition-colors duration-200"
          >
            Continue Learning
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
