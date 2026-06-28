import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/format';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Profile</p>
      <h2 className="mt-3 text-3xl font-extrabold text-slate-900">{user?.name}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ProfileField label="Email" value={user?.email ?? ''} />
        <ProfileField label="Joined" value={formatDate(user?.createdAt)} />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        ApplyMate keeps your applications, reminders, contacts, and checklists attached to your account.
      </p>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-brand-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
