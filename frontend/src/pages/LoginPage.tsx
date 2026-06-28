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
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="grid max-w-6xl overflow-hidden rounded-[2.5rem] border border-brand-200 bg-white shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative overflow-hidden bg-ink-900 p-8 text-white md:p-12">
          <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-brand-400/40" />
          <div className="absolute bottom-[-2.5rem] right-[-1rem] h-44 w-44 rounded-[2rem] bg-accent-400/85" />
          <div className="relative">
            <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em]">
              ApplyMate
            </p>
            <h1 className="mt-8 max-w-lg text-4xl font-extrabold leading-tight md:text-5xl">
              Organize your search like a focused studio, not a messy spreadsheet.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/85">
              Track applications, reminders, contacts, and required documents in a calmer flow inspired by simple educational dashboard layouts.
            </p>
            <div className="mt-8 grid max-w-md gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-3xl font-extrabold">1 place</p>
                <p className="mt-2 text-sm text-white/80">Applications, follow-ups, notes, and checklist items.</p>
              </div>
              <div className="rounded-[1.75rem] bg-brand-50 p-4 text-ink-900">
                <p className="text-3xl font-extrabold">Fast</p>
                <p className="mt-2 text-sm text-ink-700">Move between pages with lighter, clearer visual feedback.</p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 bg-[#fffdf6] p-8 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">Welcome back</p>
            <h2 className="mt-3 text-3xl font-bold text-ink-900">Login</h2>
            <p className="mt-2 text-sm text-ink-700">Use the demo account or your own credentials.</p>
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
          <div className="rounded-[1.5rem] bg-white p-4 text-sm text-ink-700">
            Demo login: <span className="font-semibold">demo@applymate.com</span> / <span className="font-semibold">password123</span>
          </div>
          <p className="text-sm text-ink-700">
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
