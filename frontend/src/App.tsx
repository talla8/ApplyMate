import { ReactElement, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PageLoader } from './components/PageLoader';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './layout/Layout';
import { AddApplicationPage } from './pages/AddApplicationPage';
import { ApplicationDetailsPage } from './pages/ApplicationDetailsPage';
import { ApplicationsListPage } from './pages/ApplicationsListPage';
import { DashboardPage } from './pages/DashboardPage';
import { EditApplicationPage } from './pages/EditApplicationPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { RemindersPage } from './pages/RemindersPage';

function AppShell({ children }: { children: ReactElement }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.key === displayLocation.key) {
      return;
    }

    setIsTransitioning(true);

    const swapTimer = window.setTimeout(() => {
      setDisplayLocation(location);
    }, 180);

    const hideTimer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 420);

    return () => {
      window.clearTimeout(swapTimer);
      window.clearTimeout(hideTimer);
    };
  }, [displayLocation.key, location]);

  return (
    <div className="relative">
      <div
        className={`transition duration-300 ${
          isTransitioning ? 'pointer-events-none scale-[0.99] opacity-40 blur-[2px]' : 'opacity-100'
        }`}
      >
        <Routes location={displayLocation}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<AppShell><DashboardPage /></AppShell>} />
          <Route path="/applications" element={<AppShell><ApplicationsListPage /></AppShell>} />
          <Route path="/applications/new" element={<AppShell><AddApplicationPage /></AppShell>} />
          <Route path="/applications/:id" element={<AppShell><ApplicationDetailsPage /></AppShell>} />
          <Route path="/applications/:id/edit" element={<AppShell><EditApplicationPage /></AppShell>} />
          <Route path="/reminders" element={<AppShell><RemindersPage /></AppShell>} />
          <Route path="/profile" element={<AppShell><ProfilePage /></AppShell>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {isTransitioning ? <PageLoader fullscreen /> : null}
    </div>
  );
}
