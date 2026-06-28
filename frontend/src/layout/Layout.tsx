import { ReactNode } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Sidebar />
        <div className="flex-1 space-y-6">
          <Navbar />
          <div className="hidden justify-end lg:flex">
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
