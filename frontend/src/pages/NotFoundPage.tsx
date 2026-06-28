import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-lg rounded-[2rem] border border-brand-100 bg-white p-10 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-500">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm text-slate-500">The page you requested does not exist.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
