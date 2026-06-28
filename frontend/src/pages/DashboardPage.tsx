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
      <section className="school-panel school-paper rounded-[2.25rem] p-6 md:p-8">
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Dashboard</p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-ink-900 md:text-4xl">
              Welcome back, {user?.name}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-ink-700">
              Keep momentum by reviewing recent applications, the next follow-ups due, and the parts of your search that need attention now.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-ink-900 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Current pace</p>
              <p className="mt-3 text-4xl font-extrabold">{cards?.totalApplications ?? 0}</p>
              <p className="mt-2 text-sm text-white/80">applications tracked so far</p>
            </div>
            <div className="rounded-[1.75rem] bg-accent-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">Next step</p>
              <p className="mt-3 text-4xl font-extrabold text-ink-900">
                {summary?.upcomingFollowUps.length ?? 0}
              </p>
              <p className="mt-2 text-sm text-ink-700">follow-ups currently queued</p>
            </div>
          </div>
        </div>
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
          <div key={label} className="school-panel rounded-[2rem] p-5">
            <p className="text-sm text-ink-700">{label}</p>
            <p className="mt-3 text-3xl font-extrabold text-ink-900">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-ink-900">Recent applications</h3>
          {summary?.recentApplications.length ? (
            summary.recentApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <EmptyState title="No applications yet" description="Create your first application to populate the dashboard." />
          )}
        </div>
        <div className="space-y-6">
          <div className="school-panel rounded-[2rem] p-5">
            <h3 className="text-lg font-bold text-ink-900">Upcoming follow-ups</h3>
            <div className="mt-4 space-y-3">
              {summary?.upcomingFollowUps.length ? (
                summary.upcomingFollowUps.map((reminder) => (
                  <div key={reminder.id} className="rounded-[1.5rem] bg-brand-50 p-4">
                    <p className="font-semibold text-ink-900">{reminder.title}</p>
                    <p className="text-sm text-ink-700">
                      {reminder.application?.companyName} • {formatDate(reminder.reminderDate)}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState title="No reminders" description="Add follow-up reminders to stay on top of responses." />
              )}
            </div>
          </div>

          <div className="school-panel rounded-[2rem] p-5">
            <h3 className="text-lg font-bold text-ink-900">Applications by status</h3>
            <div className="mt-4 space-y-3">
              {summary?.applicationsByStatus.length ? (
                summary.applicationsByStatus.map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <StatusBadge status={item.status} />
                    <span className="text-sm font-semibold text-ink-700">{item.count}</span>
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
