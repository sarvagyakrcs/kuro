
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  CheckCircle, 
  Video, 
  File, 
  FileQuestion
} from 'lucide-react';
import { createCourse } from '@/lib/api';

interface CourseCreationProps {
  topic: string;
  questions: string[];
  analyzedContent: any;
  onComplete: (courseId: string) => void;
}

const CourseCreation: React.FC<CourseCreationProps> = ({
  topic,
  questions,
  analyzedContent,
  onComplete
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [stepStatus, setStepStatus] = useState({
    1: 'in-progress',
    2: 'pending',
    3: 'pending',
    4: 'pending',
    5: 'pending'
  });
  const { toast } = useToast();

  const handleCreateCourse = async () => {
    setIsGenerating(true);
    
    try {
      // Update progress and steps to simulate course creation
      await updateStep(1, 'Creating course structure...');
      await updateStep(2, 'Generating learning modules...');
      await updateStep(3, 'Finding relevant videos...');
      await updateStep(4, 'Creating quizzes and assessments...');
      await updateStep(5, 'Finalizing course materials...');
      
      // Simulate API call
      const courseId = await createCourse(topic, questions, analyzedContent);
      
      toast({
        title: "Course Created",
        description: "Your course has been successfully created!",
      });
      
      onComplete(courseId);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateStep = async (stepNumber: number, message: string) => {
    setStep(stepNumber);
    setStepStatus(prev => ({ ...prev, [stepNumber]: 'in-progress' }));
    
    let stepProgress = 0;
    const startProgress = (stepNumber - 1) * 20;
    const endProgress = stepNumber * 20;
    
    // Simulate progress
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        stepProgress += Math.random() * 5;
        
        if (stepProgress >= 100) {
          clearInterval(interval);
          setProgress(endProgress);
          setStepStatus(prev => ({ 
            ...prev, 
            [stepNumber]: 'complete',
            [stepNumber + 1]: stepNumber < 5 ? 'in-progress' : 'complete'
          }));
          resolve();
        } else {
          const overallProgress = startProgress + (stepProgress * 0.2);
          setProgress(overallProgress);
        }
      }, 200);
    });
  };

  const getStepIcon = (stepNum: number, status: string) => {
    switch (stepNum) {
      case 1:
        return <BookOpen className="h-5 w-5" />;
      case 2:
        return <File className="h-5 w-5" />;
      case 3:
        return <Video className="h-5 w-5" />;
      case 4:
        return <FileQuestion className="h-5 w-5" />;
      case 5:
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'in-progress':
        return 'bg-primary/20 text-primary border-primary/50 animate-pulse-subtle';
      default:
        return 'bg-secondary/30 text-muted-foreground border-white/10';
    }
  };

  return (
    <Card className="shadow-md border border-white/10 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-primary to-primary/70 rounded-lg p-2">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Generate Your Course</h2>
            <p className="text-sm text-muted-foreground">
              Kuro AI will create a complete learning path for "{topic}"
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isGenerating ? (
            <div className="space-y-6">
              <div className="border border-white/10 rounded-lg p-5 bg-secondary/30">
                <h3 className="font-medium mb-3">Course Summary</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Topic</h4>
                    <p className="text-sm text-muted-foreground">{topic}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Learning Goals</h4>
                    <ul className="mt-1 space-y-1">
                      {questions.slice(0, 3).map((question, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{question}</span>
                        </li>
                      ))}
                      {questions.length > 3 && (
                        <li className="text-sm text-primary flex gap-2">
                          <span>•</span>
                          <span>+{questions.length - 3} more learning goals</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="course-structure">
                      <AccordionTrigger className="text-sm font-medium">
                        Generated Course Structure
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div className="space-y-1">
                            <h5 className="font-medium text-primary-foreground">Module 1: Introduction</h5>
                            <p>• Core concepts and fundamentals</p>
                            <p>• Historical background and context</p>
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="font-medium text-primary-foreground">Module 2: Theoretical Framework</h5>
                            <p>• Key principles and methodologies</p>
                            <p>• Analytical approaches and tools</p>
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="font-medium text-primary-foreground">Module 3: Practical Applications</h5>
                            <p>• Real-world examples and case studies</p>
                            <p>• Hands-on exercises and projects</p>
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="font-medium text-primary-foreground">Module 4: Advanced Topics</h5>
                            <p>• Cutting-edge developments</p>
                            <p>• Future trends and research directions</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              
              <div className="border border-white/10 rounded-lg p-5 bg-primary/5">
                <h3 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  What You'll Get
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span className="text-sm">Structured learning modules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span className="text-sm">Curated YouTube tutorials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span className="text-sm">AI-generated practice quizzes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span className="text-sm">Comprehensive study notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span className="text-sm">Interactive assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-500/20">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span className="text-sm">Progress tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Creating your course...</span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((stepNum) => {
                  const status = stepStatus[stepNum as keyof typeof stepStatus];
                  const stepLabels = [
                    "Creating course structure",
                    "Generating learning modules",
                    "Finding relevant videos",
                    "Creating quizzes and assessments",
                    "Finalizing course materials"
                  ];
                  
                  return (
                    <div 
                      key={stepNum}
                      className={`
                        flex items-center gap-3 p-3 rounded-md border
                        transition-all duration-300
                        ${getStatusClass(status)}
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${status === 'complete' ? 'bg-green-500/20' : status === 'in-progress' ? 'bg-primary/20' : 'bg-secondary/50'}
                      `}>
                        {getStepIcon(stepNum, status)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {stepLabels[stepNum - 1]}
                          {status === 'in-progress' && (
                            <span className="inline-block ml-2">
                              <span className="animate-pulse">...</span>
                            </span>
                          )}
                        </p>
                        {status === 'complete' && (
                          <p className="text-xs text-green-500">Complete</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
        <div className="w-full flex justify-end">
          {!isGenerating ? (
            <Button onClick={handleCreateCourse} className="gap-2">
              Generate Complete Course
            </Button>
          ) : progress === 100 ? (
            <Button disabled className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Course Created
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCreation;
