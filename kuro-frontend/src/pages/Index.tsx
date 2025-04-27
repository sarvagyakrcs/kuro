import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardSkeleton } from '@/components/ui/LoadingStates';
import CourseCard from '@/components/ui/CourseCard';
import useCourses from '@/hooks/useCourses';
import { BookOpen, Plus, Sparkles, Trophy, Clock, LogIn } from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  const { courses, isLoading } = useCourses();
  
  return (
    <Layout>
      <div className="min-h-screen p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Welcome to Kuro AI</h1>
            <p className="text-lg text-muted-foreground">Your intelligent learning platform</p>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button className="gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 shadow-lg shadow-primary/20">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI-Powered</h3>
                <p className="text-muted-foreground">Smart Learning Path</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Flexible</h3>
                <p className="text-muted-foreground">Learn at Your Pace</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Interactive</h3>
                <p className="text-muted-foreground">Engaging Content</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Courses Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Featured Courses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard 
              id="preview-1"
              title="Introduction to AI"
              description="Learn the fundamentals of Artificial Intelligence and Machine Learning."
              progress={0}
              modules={8}
              videos={24}
              quizzes={6}
              imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              isPreview
            />
            <CourseCard 
              id="preview-2"
              title="Data Science Essentials"
              description="Master the core concepts of data analysis and visualization."
              progress={0}
              modules={6}
              videos={18}
              quizzes={4}
              imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              isPreview
            />
            <CourseCard 
              id="preview-3"
              title="Web Development"
              description="Build modern web applications with the latest technologies."
              progress={0}
              modules={10}
              videos={30}
              quizzes={8}
              imageUrl="https://images.unsplash.com/photo-1627398242454-45a1465c2479"
              isPreview
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
