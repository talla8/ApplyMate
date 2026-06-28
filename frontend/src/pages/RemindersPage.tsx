import { useEffect, useState } from 'react';
import { remindersApi } from '../api/reminders';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { Reminder } from '../types';
import { formatDate } from '../utils/format';

export function RemindersPage() {
  const { token } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);

  async function loadReminders() {
    if (!token) return;
    const data = await remindersApi.list(token);
    setReminders(data);
  }

  useEffect(() => {
    loadReminders();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
        <h2 className="text-3xl font-extrabold text-slate-900">Reminders</h2>
        <p className="mt-2 text-sm text-slate-500">Manage upcoming follow-ups and mark completed outreach.</p>
      </div>

      <div className="space-y-3">
        {reminders.length ? (
          reminders.map((reminder) => (
            <div key={reminder.id} className="flex flex-col gap-4 rounded-[2rem] border border-brand-100 bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{reminder.title}</p>
                <p className="text-sm text-slate-500">
                  {reminder.application?.companyName} • {reminder.application?.jobTitle}
                </p>
                <p className="mt-1 text-sm text-slate-500">{formatDate(reminder.reminderDate)}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={reminder.isDone ? 'secondary' : 'primary'}
                  onClick={async () => {
                    if (!token) return;
                    await remindersApi.update(token, reminder.id, { isDone: !reminder.isDone });
                    await loadReminders();
                  }}
                >
                  {reminder.isDone ? 'Mark Incomplete' : 'Mark Done'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    if (!token) return;
                    await remindersApi.delete(token, reminder.id);
                    await loadReminders();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState title="No reminders scheduled" description="Add reminders from an application detail page." />
        )}
      </div>
    </div>
  );
}
