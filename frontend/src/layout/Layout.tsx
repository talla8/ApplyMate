import { ReactNode } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto flex max-w-7xl gap-6 xl:items-start">
        <Sidebar />
        <div className="flex-1 space-y-6">
          <Navbar />
          <div className="hidden items-center justify-between rounded-[2rem] border border-brand-200 bg-[#fffdf6] px-6 py-4 shadow-soft lg:flex">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
                Daily Focus
              </p>
              <p className="mt-1 text-sm text-ink-700">
                Review follow-ups, keep notes tight, and move one application forward.
              </p>
            </div>
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
