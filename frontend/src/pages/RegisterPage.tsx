import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const { login, token } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const response = await authApi.register({ name, email, password });
      login(response);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to register.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="grid w-full max-w-5xl gap-0 overflow-hidden rounded-[2.5rem] border border-brand-200 bg-white shadow-soft lg:grid-cols-[0.82fr_1.18fr]">
        <div className="bg-gradient-to-br from-brand-100 via-brand-50 to-[#fffdf6] p-8 md:p-12">
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">
            Join ApplyMate
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-ink-900">
            Build a personal system that keeps your search moving.
          </h1>
          <div className="mt-8 space-y-4">
            <div className="rounded-[1.75rem] bg-white p-5">
              <p className="font-semibold text-ink-900">Track what matters</p>
              <p className="mt-2 text-sm text-ink-700">Applications, reminders, contacts, and documents stay tied together.</p>
            </div>
            <div className="rounded-[1.75rem] bg-accent-100 p-5">
              <p className="font-semibold text-ink-900">Stay clear</p>
              <p className="mt-2 text-sm text-ink-700">A simpler layout keeps the product approachable while still structured.</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-[#fffdf6] p-8 md:p-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Create account</p>
            <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Get started</h1>
            <p className="mt-2 text-sm text-ink-700">Start tracking your opportunities in a single place.</p>
          </div>
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
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
            {loading ? 'Creating account...' : 'Register'}
          </Button>
          <p className="text-sm text-ink-700">
            Already have an account?{' '}
            <Link className="font-semibold text-brand-600" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
