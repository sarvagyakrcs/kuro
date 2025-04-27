import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  BookOpen, 
  Video, 
  FileQuestion, 
  ArrowDown, 
  CheckCircle, 
  File,
  Home,
  ChevronLeft,
  Clock,
  Menu,
  PlayCircle,
  GraduationCap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Layout from '@/components/Layout';
import VideoComponent from '@/components/ui/VideoComponent';
import QuizComponent from '@/components/ui/QuizComponent';
import { VideoSkeleton, QuizSkeleton } from '@/components/ui/LoadingStates';
import useCourses from '@/hooks/useCourses';
import { useToast } from '@/hooks/use-toast';

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchCourseById } = useCourses();
  const [course, setCourse] = useState<any>(null);
  const [activeModule, setActiveModule] = useState('module-1');
  const [activeTab, setActiveTab] = useState('video');
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const courseData = await fetchCourseById(id);
        setCourse(courseData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load course. Returning to dashboard.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourse();
  }, [id, fetchCourseById, navigate, toast]);
  
  const handleModuleCompletion = (moduleId: string) => {
    if (!course) return;
    
    // Just mark the module as completed
    const completedModules = localStorage.getItem(`${course.id}-completedModules`) || '{}';
    const completedObj = JSON.parse(completedModules);
    completedObj[moduleId] = true;
    localStorage.setItem(`${course.id}-completedModules`, JSON.stringify(completedObj));
    
    toast({
      title: "Module Completed",
      description: "Great job! You can now move on to the next module.",
    });
  };
  
  const isModuleCompleted = (moduleId: string): boolean => {
    if (!course) return false;
    
    const completedModules = localStorage.getItem(`${course.id}-completedModules`) || '{}';
    const completedObj = JSON.parse(completedModules);
    return !!completedObj[moduleId];
  };
  
  if (!course && isLoading) {
    return (
      <Layout>
        <div className="min-h-screen p-8">
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div>
              <div className="h-8 w-32 bg-white/5 rounded-lg mb-6"></div>
              <div className="space-y-4">
                <div className="h-10 bg-white/5 w-2/3 rounded-xl"></div>
                <div className="h-6 bg-white/5 w-1/2 rounded-lg"></div>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="h-10 w-32 bg-white/5 rounded-lg"></div>
                <div className="h-10 w-32 bg-white/5 rounded-lg"></div>
              </div>
            </div>
            
            {/* Progress Skeleton */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-white/5 rounded"></div>
                    <div className="h-4 w-12 bg-white/5 rounded"></div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full"></div>
                </div>
                <div className="flex gap-8">
                  <div className="text-center space-y-1">
                    <div className="h-8 w-16 bg-white/5 rounded"></div>
                    <div className="h-4 w-20 bg-white/5 rounded"></div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="h-8 w-16 bg-white/5 rounded"></div>
                    <div className="h-4 w-20 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4 space-y-3">
                  <div className="h-6 bg-white/5 w-3/4 rounded"></div>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-14 bg-white/5 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="h-[400px] bg-white/5 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentModule = course?.modules?.find((m: any) => m.id === activeModule);
  
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Course Header */}
        <div className="bg-white/[0.02] border-b border-white/10 backdrop-blur-xl sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-white"
                  onClick={() => navigate('/')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight truncate">
                    {course?.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <PlayCircle className="h-4 w-4" />
                      {course?.modules?.length} modules
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      2h 30m
                    </span>
                  </div>
                </div>
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[540px] bg-background/95 backdrop-blur-xl p-0">
                  <SheetHeader className="p-6 border-b border-white/10">
                    <SheetTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Course Content
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <PlayCircle className="h-4 w-4" />
                        <span>{course?.modules?.length} modules</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>2h 30m</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {course?.modules?.map((module: any, idx: number) => {
                        const isCompleted = isModuleCompleted(module.id);
                        const isActive = activeModule === module.id;
                        
                        return (
                          <button
                            key={module.id}
                            className={`
                              w-full text-left p-4 rounded-lg text-sm
                              flex items-center justify-between
                              transition-all duration-200
                              ${isActive 
                                ? 'bg-primary text-white' 
                                : isCompleted
                                  ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                  : 'hover:bg-white/5 text-muted-foreground hover:text-white'
                              }
                            `}
                            onClick={() => {
                              setActiveModule(module.id);
                            }}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className={`
                                shrink-0 inline-flex items-center justify-center rounded-lg w-7 h-7 text-xs font-medium
                                ${isActive 
                                  ? 'bg-white/20' 
                                  : isCompleted 
                                    ? 'bg-green-500/20' 
                                    : 'bg-white/10'
                                }
                              `}>
                                {idx + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <h4 className="truncate font-medium">{module.title}</h4>
                                <p className="text-xs opacity-70 truncate mt-0.5">
                                  {module.videoIds.length} videos • {module.questions.length} quizzes
                                </p>
                              </div>
                            </div>
                            {isCompleted && <CheckCircle className="h-4 w-4 ml-3 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Main Content */}
            {currentModule ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content Area */}
                  <div className="lg:col-span-2">
                    {/* Content Tabs */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl">
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                        <div className="border-b border-white/10">
                          <TabsList className="w-full h-14 rounded-none bg-transparent border-b border-white/10">
                            <TabsTrigger 
                              value="video" 
                              className="flex-1 h-full data-[state=active]:bg-white/5 data-[state=active]:shadow-none rounded-none border-r border-white/10"
                            >
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4" />
                                <span>Videos</span>
                              </div>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="quiz" 
                              className="flex-1 h-full data-[state=active]:bg-white/5 data-[state=active]:shadow-none rounded-none border-r border-white/10"
                            >
                              <div className="flex items-center gap-2">
                                <FileQuestion className="h-4 w-4" />
                                <span>Quizzes</span>
                              </div>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="notes" 
                              className="flex-1 h-full data-[state=active]:bg-white/5 data-[state=active]:shadow-none rounded-none"
                            >
                              <div className="flex items-center gap-2">
                                <File className="h-4 w-4" />
                                <span>Notes</span>
                              </div>
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        <TabsContent value="video" className="focus-visible:outline-none">
                          <div className="space-y-4 p-6">
                            {currentModule.videoIds.map((videoId: string, idx: number) => (
                              <VideoComponent
                                key={videoId}
                                title={`${idx + 1}. ${currentModule.title} - Part ${idx + 1}`}
                                description="This video covers key concepts and examples to help you understand the material."
                                videoUrl={videoId}
                                duration="12:34"
                              />
                            ))}
                            
                            <div className="flex justify-center pt-4">
                              <Button
                                variant="outline"
                                onClick={() => setActiveTab('quiz')}
                                className="gap-2"
                              >
                                Continue to Quiz <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="quiz" className="focus-visible:outline-none p-6">
                          <QuizComponent
                            title={`${currentModule.title} Assessment`}
                            questions={currentModule.questions}
                            onComplete={() => handleModuleCompletion(currentModule.id)}
                          />
                        </TabsContent>
                        
                        <TabsContent value="notes" className="focus-visible:outline-none">
                          <div className="p-6">
                            <Card className="border border-white/10 shadow-md bg-card/70 backdrop-blur-sm overflow-hidden">
                              <div className="p-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <File className="h-4 w-4 text-primary" />
                                  </div>
                                  <h3 className="font-medium">Study Notes</h3>
                                </div>
                              </div>
                              
                              <div className="p-6 space-y-6">
                                <div className="prose prose-invert max-w-none">
                                  <p className="text-muted-foreground leading-relaxed">{currentModule.notes}</p>
                                </div>
                                
                                <div className="bg-secondary/30 border border-white/10 rounded-lg p-6">
                                  <h4 className="text-lg font-medium mb-4">Key Takeaways</h4>
                                  <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                      <span className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">1</span>
                                      </span>
                                      <span>Understanding the fundamental principles is essential for building advanced knowledge</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                      <span className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">2</span>
                                      </span>
                                      <span>Practical applications demonstrate how theoretical concepts work in real-world scenarios</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                      <span className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">3</span>
                                      </span>
                                      <span>Regular practice through examples and exercises reinforces learning</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                      <span className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">4</span>
                                      </span>
                                      <span>The field continues to evolve, requiring ongoing learning and adaptation</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="flex justify-center">
                                  <Button
                                    variant="outline"
                                    onClick={() => setActiveTab('quiz')}
                                    className="gap-2"
                                  >
                                    Take the Quiz <ArrowDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>

                  {/* Course Info Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="space-y-6">
                      <Card className="border-white/10 bg-white/[0.02] backdrop-blur-xl">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3">{course?.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-6">{course?.description}</p>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Level</div>
                                <div className="text-sm text-muted-foreground">Intermediate</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Duration</div>
                                <div className="text-sm text-muted-foreground">2h 30m total</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <PlayCircle className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Content</div>
                                <div className="text-sm text-muted-foreground">{course?.modules?.length} modules</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="border-white/10 bg-white/[0.02] backdrop-blur-xl">
                        <div className="p-6">
                          <h4 className="font-medium mb-4">Course Modules</h4>
                          <div className="space-y-2">
                            {course?.modules?.map((module: any, idx: number) => {
                              const isCompleted = isModuleCompleted(module.id);
                              const isActive = activeModule === module.id;
                              
                              return (
                                <button
                                  key={module.id}
                                  className={`
                                    w-full text-left p-3 rounded-lg text-sm
                                    flex items-center justify-between
                                    transition-all duration-200
                                    ${isActive 
                                      ? 'bg-primary text-white' 
                                      : isCompleted
                                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                        : 'hover:bg-white/5 text-muted-foreground hover:text-white'
                                    }
                                  `}
                                  onClick={() => setActiveModule(module.id)}
                                >
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className={`
                                      shrink-0 inline-flex items-center justify-center rounded-lg w-6 h-6 text-xs
                                      ${isActive 
                                        ? 'bg-white/20' 
                                        : isCompleted 
                                          ? 'bg-green-500/20' 
                                          : 'bg-white/10'
                                      }
                                    `}>
                                      {idx + 1}
                                    </span>
                                    <span className="truncate">{module.title}</span>
                                  </div>
                                  {isCompleted && <CheckCircle className="h-4 w-4 ml-2 flex-shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] rounded-xl border border-dashed border-white/10 bg-white/5">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Select a module to start</h3>
                  <p className="text-muted-foreground mt-1">Choose a module from the list to begin learning</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Course;
