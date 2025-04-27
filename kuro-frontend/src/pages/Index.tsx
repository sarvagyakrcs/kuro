import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardSkeleton } from '@/components/ui/LoadingStates';
import CourseCard from '@/components/ui/CourseCard';
import useCourses from '@/hooks/useCourses';
import { BookOpen, Plus, Sparkles, Trophy, Clock } from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  const { courses, isLoading } = useCourses();
  
  return (
    <Layout>
      <div className="min-h-screen p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Your Learning Dashboard</h1>
            <p className="text-lg text-muted-foreground">Track your progress and continue your learning journey</p>
          </div>
          <Link to="/create">
            <Button className="gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 shadow-lg shadow-primary/20 transition-all duration-200">
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-muted-foreground">Courses Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">48h</h3>
                <p className="text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-10">
          {/* Continue Learning Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">Continue Learning</h2>
              <Button variant="ghost" className="text-muted-foreground hover:text-white">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : courses.length > 0 ? (
                courses.map(course => (
                  <CourseCard 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    progress={course.progress}
                    modules={course.modules}
                    videos={course.videos}
                    quizzes={course.quizzes}
                    imageUrl={course.imageUrl}
                    isNew={course.isNew}
                  />
                ))
              ) : (
                <div className="col-span-full">
                  <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No courses yet</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Create your first AI-generated course to start your learning journey
                    </p>
                    <Link to="/create">
                      <Button className="gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90">
                        <Plus className="h-4 w-4" />
                        Create New Course
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {/* Recommended Section */}
          {courses.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">Recommended For You</h2>
                <Button variant="ghost" className="text-muted-foreground hover:text-white">Browse All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : (
                  <>
                    <CourseCard 
                      id="recommended-1"
                      title="Advanced Data Visualization"
                      description="Master cutting-edge techniques for presenting complex data in intuitive ways."
                      progress={0}
                      modules={6}
                      videos={15}
                      quizzes={4}
                      imageUrl="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
                    />
                    <CourseCard 
                      id="recommended-2"
                      title="Ethical AI Development"
                      description="Learn how to develop and deploy AI systems with ethical considerations at the forefront."
                      progress={0}
                      modules={4}
                      videos={10}
                      quizzes={3}
                      imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
                    />
                  </>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
