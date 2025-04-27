
import { useState, useEffect } from 'react';

// Mock data
const dummyQuestions = [
  "What are the fundamental principles of the topic?",
  "How does this topic relate to real-world applications?",
  "What are the historical developments in this field?",
  "Who are the key contributors to this topic?",
  "What are the current trends and future directions?",
  "How can I apply this knowledge practically?"
];

const dummyCourses = [
  {
    id: "course-1",
    title: "Machine Learning Fundamentals",
    description: "Master the core concepts and algorithms behind machine learning and AI.",
    progress: 65,
    modules: 5,
    videos: 12,
    quizzes: 4,
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
  },
  {
    id: "course-2",
    title: "Web Development Bootcamp",
    description: "Learn modern web development from the ground up with React, Node and more.",
    progress: 30,
    modules: 8,
    videos: 24,
    quizzes: 6,
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
  },
  {
    id: "course-3",
    title: "Data Science for Beginners",
    description: "Start your journey into data analysis, visualization and data-driven decision making.",
    progress: 10,
    modules: 6,
    videos: 18,
    quizzes: 5,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
  }
];

const dummyModules = [
  {
    id: "module-1",
    title: "Introduction to the Subject",
    description: "Get familiar with the basic concepts and principles.",
    videoIds: ["J7LqLy2lKQs", "d2eBlSZwCdk"],
    notes: "This module covers foundational concepts that will be built upon throughout the course...",
    questions: [
      {
        id: "q1",
        question: "Which of the following best describes the main purpose of this field?",
        options: [
          "To develop theoretical models only",
          "To solve practical problems using systematic approaches",
          "To create documentation for existing solutions",
          "To replace human decision making entirely"
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        question: "Who is generally credited as the founder of this field of study?",
        options: [
          "Albert Einstein",
          "Leonardo da Vinci",
          "Ada Lovelace",
          "Isaac Newton"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "module-2",
    title: "Core Principles and Methodologies",
    description: "Understand the key principles that govern this field.",
    videoIds: ["T9AF0ilw_eo", "YunW3-hw_04"],
    notes: "The core principles discussed in this module form the theoretical foundation for all practical applications...",
    questions: [
      {
        id: "q3",
        question: "Which principle is most important when applying these concepts to real-world situations?",
        options: [
          "Speed of implementation",
          "Theoretical purity",
          "Balance between theory and practice",
          "Following historical precedent"
        ],
        correctAnswer: 2
      },
      {
        id: "q4",
        question: "What methodology is generally preferred for solving complex problems in this field?",
        options: [
          "Trial and error",
          "Systematic decomposition into smaller problems",
          "Reliance on intuition",
          "Asking experts only"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "module-3",
    title: "Practical Applications",
    description: "Learn how to apply concepts to real-world scenarios.",
    videoIds: ["mgNJ7NRJ0NY", "WUtJUzoSZ-c"],
    notes: "This module bridges theory with practice through concrete examples and case studies...",
    questions: [
      {
        id: "q5",
        question: "In a real-world application, what is typically the most limiting factor?",
        options: [
          "Computing power",
          "Budget constraints",
          "User adoption",
          "All of the above depending on context"
        ],
        correctAnswer: 3
      },
      {
        id: "q6",
        question: "Which industry has seen the most transformation from applications in this field?",
        options: [
          "Healthcare",
          "Finance",
          "Education",
          "Entertainment"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "module-4",
    title: "Advanced Topics and Future Trends",
    description: "Explore cutting-edge developments and emerging trends.",
    videoIds: ["rtZ4T4R4WKM", "Z8mpGFj4AJ0"],
    notes: "The advanced topics covered here represent the cutting edge of research and development...",
    questions: [
      {
        id: "q7",
        question: "Which trend is likely to have the biggest impact in the next decade?",
        options: [
          "Improved algorithms",
          "Hardware advancements",
          "Integration with other fields",
          "Regulatory changes"
        ],
        correctAnswer: 2
      },
      {
        id: "q8",
        question: "What is the biggest challenge facing the future development of this field?",
        options: [
          "Ethical considerations",
          "Technical limitations",
          "User acceptance",
          "Cost of implementation"
        ],
        correctAnswer: 0
      }
    ]
  }
];

// Simulate delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API function to generate questions
export const generateQuestions = async (topic: string, description?: string): Promise<string[]> => {
  // Simulate API delay
  await delay(2000 + Math.random() * 2000);
  
  // Return dummy questions with topic inserted
  return dummyQuestions.map(q => q.replace('this topic', topic).replace('this field', topic));
};

// Mock API function to analyze notes
export const analyzeNotes = async (topic: string, questions: string[], files: any[]): Promise<any> => {
  // Simulate API delay
  await delay(3000 + Math.random() * 3000);
  
  // Return dummy analysis
  return {
    topic,
    questions,
    keyInsights: [
      "The fundamental principles appear to be well understood",
      "Some practical applications may need further exploration",
      "Historical context is adequately covered",
      "Connection to related fields could be strengthened"
    ],
    recommendedResources: files.map(f => ({ name: f.name, relevance: Math.random() * 100 }))
  };
};

// Mock API function to create course
export const createCourse = async (topic: string, questions: string[], analyzedContent: any): Promise<string> => {
  // Simulate API delay
  await delay(5000 + Math.random() * 3000);
  
  // Generated course ID
  const courseId = `course-${Math.random().toString(36).substring(2, 9)}`;
  
  // In a real app, this would create and store the course
  return courseId;
};

// Mock API function to get all courses
export const getCourses = async (): Promise<typeof dummyCourses> => {
  // Simulate API delay
  await delay(1000 + Math.random() * 1000);
  
  return dummyCourses;
};

// Mock API function to get course details
export const getCourseById = async (id: string): Promise<any> => {
  // Simulate API delay
  await delay(1000 + Math.random() * 1000);
  
  // Find the course
  const course = dummyCourses.find(c => c.id === id);
  
  if (!course) {
    throw new Error("Course not found");
  }
  
  // Return course with modules
  return {
    ...course,
    modules: dummyModules
  };
};

// Custom hook for caching course data
export function useCourseData() {
  const [courses, setCourses] = useState<typeof dummyCourses>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch courses"));
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  return { courses, loading, error };
}
