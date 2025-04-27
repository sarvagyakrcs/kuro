import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { config } from '../lib/config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = config.marketingAppUrl;
    return null;
  }

  return <>{children}</>;
} 