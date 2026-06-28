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
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-5 rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft md:p-12"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-500">ApplyMate</p>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Start tracking your opportunities in a single place.</p>
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
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link className="font-semibold text-brand-600" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
