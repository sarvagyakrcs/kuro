# Kuro AI Learning Platform

A modern, AI-powered learning platform built with React, TypeScript, and Tailwind CSS. This application features a sleek, professional UI with interactive course management, video lessons, quizzes, and note-taking capabilities.

## 🚀 Features

- **Modern UI/UX**
  - Responsive design with mobile-first approach
  - Glass-morphism effects and subtle animations
  - Dark theme with professional color scheme
  - Interactive loading states and transitions

- **Course Management**
  - Create and manage courses
  - Video lessons with progress tracking
  - Interactive quizzes
  - Note-taking and file upload system
  - Module-based learning structure

- **Core Components**
  - Video player with completion tracking
  - Quiz system with immediate feedback
  - Notes upload with AI processing
  - Course creation wizard
  - Responsive navigation with mobile support

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── Layout.tsx        # Main layout wrapper
│   ├── BackgroundEffects.tsx
│   └── NotesUpload.tsx
├── pages/
│   ├── Index.tsx         # Landing page
│   ├── Dashboard.tsx     # Course dashboard
│   ├── Course.tsx        # Individual course view
│   └── CreateCourse.tsx  # Course creation
├── hooks/
│   ├── useCourses.ts     # Course management hook
│   └── use-toast.ts      # Toast notifications
└── lib/
    └── utils.ts          # Utility functions
```

## 🔧 Setup & Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kuro-ai-genesis-course
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔌 Backend Integration Guide

### 1. API Configuration

Create an `api` directory in `src` with the following structure:

```typescript
// src/api/config.ts
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const endpoints = {
  courses: '/courses',
  videos: '/videos',
  quizzes: '/quizzes',
  notes: '/notes',
  users: '/users',
};
```

### 2. API Client Setup

```typescript
// src/api/client.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. Service Integration

#### Course Service
```typescript
// src/services/courseService.ts
import { apiClient } from '../api/client';
import { endpoints } from '../api/config';

export const courseService = {
  async getCourses() {
    const response = await apiClient.get(endpoints.courses);
    return response.data;
  },

  async getCourseById(id: string) {
    const response = await apiClient.get(`${endpoints.courses}/${id}`);
    return response.data;
  },

  async createCourse(courseData: any) {
    const response = await apiClient.post(endpoints.courses, courseData);
    return response.data;
  },

  async updateCourseProgress(courseId: string, progress: number) {
    const response = await apiClient.patch(`${endpoints.courses}/${courseId}/progress`, { progress });
    return response.data;
  },
};
```

#### Video Service
```typescript
// src/services/videoService.ts
import { apiClient } from '../api/client';
import { endpoints } from '../api/config';

export const videoService = {
  async getVideoUrl(videoId: string) {
    const response = await apiClient.get(`${endpoints.videos}/${videoId}/url`);
    return response.data.url;
  },

  async updateVideoProgress(videoId: string, progress: number) {
    const response = await apiClient.patch(`${endpoints.videos}/${videoId}/progress`, { progress });
    return response.data;
  },
};
```

### 4. Hook Integration

Update the `useCourses` hook to use the actual API:

```typescript
// src/hooks/useCourses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export function useCourses() {
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getCourses(),
  });

  const createCourseMutation = useMutation({
    mutationFn: (courseData: any) => courseService.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    courses,
    isLoading,
    createCourse: createCourseMutation.mutate,
  };
}
```

### 5. Required Backend Endpoints

Your backend should implement these endpoints:

```
Courses:
- GET    /api/courses
- GET    /api/courses/:id
- POST   /api/courses
- PATCH  /api/courses/:id/progress

Videos:
- GET    /api/videos/:id/url
- PATCH  /api/videos/:id/progress

Quizzes:
- GET    /api/quizzes/:id
- POST   /api/quizzes/:id/submit

Notes:
- POST   /api/notes/upload
- GET    /api/notes/:courseId

Users:
- POST   /api/auth/login
- POST   /api/auth/register
- GET    /api/users/me
```

### 6. Data Models

Example course model for backend implementation:

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  videoIds: string[];
  notes: string;
  questions: Question[];
  isCompleted: boolean;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}
```

## 🔐 Authentication Integration

1. Create an authentication context:
```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { apiClient } from '../api/client';

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

2. Wrap your app with the AuthProvider:
```typescript
// src/App.tsx
import { AuthProvider } from './contexts/AuthContext';

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      {/* Existing app code */}
    </QueryClientProvider>
  </AuthProvider>
);
```

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STORAGE_URL=http://localhost:3000/storage
VITE_WS_URL=ws://localhost:3000
```

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist` directory, ready to be deployed to your hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
