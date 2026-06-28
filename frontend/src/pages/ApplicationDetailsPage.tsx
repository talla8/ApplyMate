import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { applicationsApi } from '../api/applications';
import { contactsApi } from '../api/contacts';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { Input, Textarea } from '../components/Input';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { Application, Contact, DocumentChecklist } from '../types';
import { formatDate, formatEnum } from '../utils/format';

export function ApplicationDetailsPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [checklist, setChecklist] = useState<Partial<DocumentChecklist>>({});
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [contactForm, setContactForm] = useState<Partial<Contact>>({ name: '' });
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function loadApplication() {
    if (!token || !id) return;
    const data = await applicationsApi.get(token, id);
    setApplication(data);
    setChecklist(data.checklist ?? {});
  }

  useEffect(() => {
    loadApplication().catch((loadError) =>
      setError(loadError instanceof Error ? loadError.message : 'Unable to load application.'),
    );
  }, [id, token]);

  async function handleAddReminder(event: FormEvent) {
    event.preventDefault();
    if (!token || !id) return;
    await applicationsApi.addReminder(token, id, { title: reminderTitle, reminderDate });
    setReminderTitle('');
    setReminderDate('');
    await loadApplication();
  }

  async function handleSaveChecklist() {
    if (!token || !id) return;
    const saved = await applicationsApi.updateChecklist(token, id, checklist);
    setChecklist(saved);
  }

  async function handleContactSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token || !id || !contactForm.name) return;

    if (editingContactId) {
      await contactsApi.update(token, editingContactId, contactForm);
    } else {
      await applicationsApi.addContact(token, id, contactForm);
    }

    setContactForm({ name: '' });
    setEditingContactId(null);
    await loadApplication();
  }

  if (!application) {
    return <div className="text-sm text-slate-500">Loading application...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-extrabold text-slate-900">{application.companyName}</h2>
              <StatusBadge status={application.status} />
            </div>
            <p className="mt-2 text-sm text-slate-500">{application.jobTitle}</p>
          </div>
          <div className="flex gap-3">
            <Link to={`/applications/${application.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button
              variant="danger"
              onClick={async () => {
                if (!token || !id) return;
                await applicationsApi.delete(token, id);
                navigate('/applications');
              }}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard label="Location" value={application.location || 'Not set'} />
          <InfoCard label="Work Mode" value={formatEnum(application.workMode)} />
          <InfoCard label="Job Type" value={formatEnum(application.jobType)} />
          <InfoCard label="Priority" value={formatEnum(application.priority)} />
          <InfoCard label="Source" value={formatEnum(application.source)} />
          <InfoCard label="Applied Date" value={formatDate(application.appliedDate)} />
          <InfoCard label="Deadline" value={formatDate(application.deadline)} />
          <InfoCard label="Salary Range" value={application.salaryRange || 'Not set'} />
          <InfoCard label="Job Link" value={application.jobLink || 'Not set'} />
        </div>

        {application.notes ? (
          <div className="mt-6 rounded-3xl bg-brand-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Notes</p>
            <p className="mt-2 text-sm text-slate-600">{application.notes}</p>
          </div>
        ) : null}
      </section>

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900">Follow-up reminders</h3>
            <form onSubmit={handleAddReminder} className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <Input label="Title" value={reminderTitle} onChange={(e) => setReminderTitle(e.target.value)} required />
              <Input
                label="Reminder Date"
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                required
              />
              <div className="flex items-end">
                <Button type="submit" className="w-full">Add</Button>
              </div>
            </form>
            <div className="mt-4 space-y-3">
              {application.reminders?.length ? (
                application.reminders.map((reminder) => (
                  <div key={reminder.id} className="rounded-2xl bg-brand-50 p-4">
                    <p className="font-semibold text-slate-900">{reminder.title}</p>
                    <p className="text-sm text-slate-500">{formatDate(reminder.reminderDate)}</p>
                  </div>
                ))
              ) : (
                <EmptyState title="No reminders yet" description="Add a reminder to keep follow-ups on time." />
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-bold text-slate-900">Documents checklist</h3>
            <div className="mt-4 grid gap-3">
              {[
                ['cvSubmitted', 'CV submitted'],
                ['coverLetterSubmitted', 'Cover letter submitted'],
                ['portfolioSubmitted', 'Portfolio submitted'],
                ['githubSubmitted', 'GitHub submitted'],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(checklist[key as keyof DocumentChecklist])}
                    onChange={(event) =>
                      setChecklist({
                        ...checklist,
                        [key]: event.target.checked,
                      })
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
              <Textarea
                label="Checklist Notes"
                value={checklist.notes ?? ''}
                onChange={(event) => setChecklist({ ...checklist, notes: event.target.value })}
              />
              <Button onClick={handleSaveChecklist}>Save Checklist</Button>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-bold text-slate-900">Contacts</h3>
          <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
            <Input
              label="Name"
              value={contactForm.name ?? ''}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
            <Input
              label="Role"
              value={contactForm.role ?? ''}
              onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={contactForm.email ?? ''}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            />
            <Input
              label="LinkedIn URL"
              type="url"
              value={contactForm.linkedinUrl ?? ''}
              onChange={(e) => setContactForm({ ...contactForm, linkedinUrl: e.target.value })}
            />
            <Textarea
              label="Notes"
              value={contactForm.notes ?? ''}
              onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
            />
            <Button type="submit">{editingContactId ? 'Update Contact' : 'Add Contact'}</Button>
          </form>

          <div className="mt-6 space-y-3">
            {application.contacts?.length ? (
              application.contacts.map((contact) => (
                <div key={contact.id} className="rounded-2xl bg-brand-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{contact.name}</p>
                      <p className="text-sm text-slate-500">{contact.role || 'No role set'}</p>
                      {contact.email ? <p className="text-sm text-slate-500">{contact.email}</p> : null}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditingContactId(contact.id);
                          setContactForm(contact);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={async () => {
                          if (!token) return;
                          await contactsApi.delete(token, contact.id);
                          await loadApplication();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="No contacts yet" description="Store recruiters, referral contacts, or interviewers here." />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-brand-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-800 break-all">{value}</p>
    </div>
  );
}
