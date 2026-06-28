import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
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
  return (
    <Routes>
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
  );
}
