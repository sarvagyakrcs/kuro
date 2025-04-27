
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import useCourses from '@/hooks/useCourses';
import { DashboardSkeleton } from '@/components/ui/LoadingStates';
import CourseCard from '@/components/ui/CourseCard';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { courses, isLoading } = useCourses();
  
  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <DashboardSkeleton />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your learning paths</p>
          </div>
          <Link to="/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">In Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.progress > 0 && course.progress < 100).length > 0 ? (
                courses
                  .filter(course => course.progress > 0 && course.progress < 100)
                  .map(course => (
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
                <div className="col-span-full flex flex-col items-center justify-center py-8 px-4 border border-dashed border-white/20 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground">No courses in progress</p>
                </div>
              )}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Completed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.progress === 100).length > 0 ? (
                courses
                  .filter(course => course.progress === 100)
                  .map(course => (
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
                    />
                  ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-8 px-4 border border-dashed border-white/20 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground">No completed courses</p>
                </div>
              )}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Not Started</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => course.progress === 0).length > 0 ? (
                courses
                  .filter(course => course.progress === 0)
                  .map(course => (
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
                <div className="col-span-full flex flex-col items-center justify-center py-10 px-4 border border-dashed border-white/20 rounded-lg bg-secondary/30">
                  <div className="bg-secondary/50 p-3 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No courses yet</h3>
                  <p className="text-muted-foreground text-center max-w-md mt-1 mb-4">
                    Create your first AI-generated course to start your learning journey
                  </p>
                  <Link to="/create">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create New Course
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
