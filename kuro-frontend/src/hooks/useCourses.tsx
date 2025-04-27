
import { useState, useEffect, useCallback } from 'react';
import { getCourses, getCourseById } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Course {
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

interface Module {
  id: string;
  title: string;
  description: string;
  videoIds: string[];
  notes: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  progress: number;
  videos: number;
  quizzes: number;
  imageUrl?: string;
  isNew?: boolean;
  modules: Module[];
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  
  // Cache for course details
  const [courseDetailsCache, setCourseDetailsCache] = useState<Record<string, CourseDetails>>({});
  
  // Fetch all courses
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  // Fetch a specific course by ID with caching
  const fetchCourseById = useCallback(async (id: string) => {
    // Return cached data if available
    if (courseDetailsCache[id]) {
      return courseDetailsCache[id];
    }
    
    try {
      const courseData = await getCourseById(id);
      // Update the cache
      setCourseDetailsCache(prev => ({
        ...prev,
        [id]: courseData
      }));
      
      return courseData;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load course details. Please try again.",
        variant: "destructive"
      });
      throw err;
    }
  }, [courseDetailsCache, toast]);
  
  // Add a new course
  const addCourse = useCallback((newCourse: Course) => {
    setCourses(prev => [
      { ...newCourse, isNew: true },
      ...prev
    ]);
    toast({
      title: "Course Created",
      description: `${newCourse.title} has been created successfully.`
    });
  }, [toast]);
  
  // Update course progress (optimistically)
  const updateCourseProgress = useCallback((courseId: string, newProgress: number) => {
    // Optimistic update
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId
          ? { ...course, progress: newProgress }
          : course
      )
    );
    
    // Update course details cache if it exists
    setCourseDetailsCache(prev => {
      if (prev[courseId]) {
        return {
          ...prev,
          [courseId]: {
            ...prev[courseId],
            progress: newProgress
          }
        };
      }
      return prev;
    });
    
    // In a real app, you would also make an API call here
    // and handle potential errors/rollbacks
  }, []);
  
  // Load courses on initial mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  
  return {
    courses,
    isLoading,
    error,
    fetchCourseById,
    addCourse,
    updateCourseProgress,
    refreshCourses: fetchCourses
  };
}

export default useCourses;
