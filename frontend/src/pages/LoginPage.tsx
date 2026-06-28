import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login, token } = useAuth();
  const [email, setEmail] = useState('demo@applymate.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      login(response);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid max-w-5xl overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-gradient-to-br from-brand-500 via-brand-400 to-white p-8 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em]">ApplyMate</p>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight">
            A calmer way to manage your job search.
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/90">
            Track applications, reminders, contacts, and checklists in one clean dashboard.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-8 md:p-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Login</h2>
            <p className="mt-2 text-sm text-slate-500">Use the demo account or your own credentials.</p>
          </div>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <p className="text-sm text-slate-500">
            No account yet?{' '}
            <Link className="font-semibold text-brand-600" to="/register">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
