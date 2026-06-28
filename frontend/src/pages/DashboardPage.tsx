import { useEffect, useState } from 'react';
import { dashboardApi } from '../api/dashboard';
import { ApplicationCard } from '../components/ApplicationCard';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { DashboardSummary } from '../types';
import { formatDate } from '../utils/format';

export function DashboardPage() {
  const { token, user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    dashboardApi
      .getSummary(token)
      .then(setSummary)
      .catch((loadError) =>
        setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.'),
      );
  }, [token]);

  const cards = summary?.cards;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Dashboard</p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Welcome back, {user?.name}</h2>
        <p className="mt-2 text-sm text-slate-500">
          Keep momentum by reviewing recent applications and the next follow-ups due.
        </p>
      </section>

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['Total applications', cards?.totalApplications ?? 0],
          ['Applied', cards?.applied ?? 0],
          ['Interviewing', cards?.interviewing ?? 0],
          ['Rejected', cards?.rejected ?? 0],
          ['Offers', cards?.offers ?? 0],
          ['Saved opportunities', cards?.savedOpportunities ?? 0],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2rem] border border-brand-100 bg-white p-5 shadow-soft">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Recent applications</h3>
          {summary?.recentApplications.length ? (
            summary.recentApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <EmptyState title="No applications yet" description="Create your first application to populate the dashboard." />
          )}
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-brand-100 bg-white p-5 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900">Upcoming follow-ups</h3>
            <div className="mt-4 space-y-3">
              {summary?.upcomingFollowUps.length ? (
                summary.upcomingFollowUps.map((reminder) => (
                  <div key={reminder.id} className="rounded-2xl bg-brand-50 p-4">
                    <p className="font-semibold text-slate-900">{reminder.title}</p>
                    <p className="text-sm text-slate-500">
                      {reminder.application?.companyName} • {formatDate(reminder.reminderDate)}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState title="No reminders" description="Add follow-up reminders to stay on top of responses." />
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-100 bg-white p-5 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900">Applications by status</h3>
            <div className="mt-4 space-y-3">
              {summary?.applicationsByStatus.length ? (
                summary.applicationsByStatus.map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <StatusBadge status={item.status} />
                    <span className="text-sm font-semibold text-slate-700">{item.count}</span>
                  </div>
                ))
              ) : (
                <EmptyState title="No status data" description="Status breakdown appears once applications exist." />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
