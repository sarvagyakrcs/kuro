import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { config } from '../lib/config';
import { DashboardSkeleton } from '@/components/ui/LoadingStates';
import Layout from '@/components/Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <DashboardSkeleton />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    window.location.href = config.marketingAppUrl;
    return null;
  }

  return <>{children}</>;
} 