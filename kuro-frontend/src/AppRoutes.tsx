import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider } from "./lib/auth-context";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./lib/auth-context";

// Wrapper component to handle auth-based redirects for the landing page
const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/courses" /> : <Index />;
};

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
} 