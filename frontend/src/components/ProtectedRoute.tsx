import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from './PageLoader';

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const { loading, token } = useAuth();

  if (loading) {
    return <PageLoader fullscreen label="Restoring your workspace..." />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
