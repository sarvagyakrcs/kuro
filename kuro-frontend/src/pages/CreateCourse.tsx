
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import TopicInput from '@/components/TopicInput';
import NotesUpload from '@/components/NotesUpload';
import CourseCreation from '@/components/CourseCreation';
import useCourses from '@/hooks/useCourses';

type CreationStep = 'topic' | 'upload' | 'create';

interface StepData {
  topic: string;
  questions: string[];
  analyzedContent: any;
}

const CreateCourse = () => {
  const [step, setStep] = useState<CreationStep>('topic');
  const [stepData, setStepData] = useState<StepData>({
    topic: '',
    questions: [],
    analyzedContent: null
  });
  const navigate = useNavigate();
  const { addCourse } = useCourses();
  
  const handleTopicComplete = (topic: string, questions: string[]) => {
    setStepData(prev => ({ ...prev, topic, questions }));
    setStep('upload');
  };
  
  const handleUploadComplete = (analyzedContent: any) => {
    setStepData(prev => ({ ...prev, analyzedContent }));
    setStep('create');
  };
  
  const handleCourseCreated = (courseId: string) => {
    // In a real app, you might fetch the course data here
    // For now, we'll create a dummy course object
    addCourse({
      id: courseId,
      title: stepData.topic,
      description: `An AI-generated course on ${stepData.topic}`,
      progress: 0,
      modules: 4,
      videos: 8,
      quizzes: 4,
    });
    
    navigate(`/course/${courseId}`);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {step === 'topic' && (
          <TopicInput onComplete={handleTopicComplete} />
        )}
        
        {step === 'upload' && (
          <NotesUpload 
            topic={stepData.topic}
            questions={stepData.questions}
            onComplete={handleUploadComplete}
          />
        )}
        
        {step === 'create' && (
          <CourseCreation
            topic={stepData.topic}
            questions={stepData.questions}
            analyzedContent={stepData.analyzedContent}
            onComplete={handleCourseCreated}
          />
        )}
      </div>
    </Layout>
  );
};

export default CreateCourse;
