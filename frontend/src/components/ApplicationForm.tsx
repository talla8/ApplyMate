import { FormEvent, useState } from 'react';
import { Application } from '../types';
import { formatEnum } from '../utils/format';
import {
  jobTypeOptions,
  priorityOptions,
  sourceOptions,
  statusOptions,
  workModeOptions,
} from '../utils/options';
import { Button } from './Button';
import { Input, Textarea } from './Input';

type ApplicationPayload = Omit<
  Application,
  'id' | 'userId' | 'createdAt' | 'updatedAt' | 'reminders' | 'contacts' | 'checklist'
>;

function toDateInput(value?: string | null) {
  return value ? new Date(value).toISOString().slice(0, 10) : '';
}

const defaultValues: ApplicationPayload = {
  companyName: '',
  jobTitle: '',
  jobLink: '',
  location: '',
  workMode: 'REMOTE',
  jobType: 'FULL_TIME',
  status: 'SAVED',
  priority: 'MEDIUM',
  appliedDate: '',
  deadline: '',
  source: 'LINKEDIN',
  salaryRange: '',
  notes: '',
};

export function ApplicationForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: Partial<Application>;
  onSubmit: (values: Partial<Application>) => Promise<void>;
  submitLabel: string;
}) {
  const [values, setValues] = useState<ApplicationPayload>({
    ...defaultValues,
    ...initialValues,
    appliedDate: toDateInput(initialValues?.appliedDate),
    deadline: toDateInput(initialValues?.deadline),
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      await onSubmit({
        ...values,
        appliedDate: values.appliedDate || null,
        deadline: values.deadline || null,
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Company Name"
          value={values.companyName}
          onChange={(event) => setValues({ ...values, companyName: event.target.value })}
          required
        />
        <Input
          label="Job Title"
          value={values.jobTitle}
          onChange={(event) => setValues({ ...values, jobTitle: event.target.value })}
          required
        />
        <Input
          label="Job Link"
          type="url"
          value={values.jobLink ?? ''}
          onChange={(event) => setValues({ ...values, jobLink: event.target.value })}
        />
        <Input
          label="Location"
          value={values.location ?? ''}
          onChange={(event) => setValues({ ...values, location: event.target.value })}
        />
        <SelectField
          label="Work Mode"
          value={values.workMode}
          options={workModeOptions}
          onChange={(value) => setValues({ ...values, workMode: value as Application['workMode'] })}
        />
        <SelectField
          label="Job Type"
          value={values.jobType}
          options={jobTypeOptions}
          onChange={(value) => setValues({ ...values, jobType: value as Application['jobType'] })}
        />
        <SelectField
          label="Status"
          value={values.status}
          options={statusOptions}
          onChange={(value) => setValues({ ...values, status: value as Application['status'] })}
        />
        <SelectField
          label="Priority"
          value={values.priority}
          options={priorityOptions}
          onChange={(value) => setValues({ ...values, priority: value as Application['priority'] })}
        />
        <Input
          label="Applied Date"
          type="date"
          value={values.appliedDate ?? ''}
          onChange={(event) => setValues({ ...values, appliedDate: event.target.value })}
        />
        <Input
          label="Deadline"
          type="date"
          value={values.deadline ?? ''}
          onChange={(event) => setValues({ ...values, deadline: event.target.value })}
        />
        <SelectField
          label="Source"
          value={values.source}
          options={sourceOptions}
          onChange={(value) => setValues({ ...values, source: value as Application['source'] })}
        />
        <Input
          label="Salary Range"
          value={values.salaryRange ?? ''}
          onChange={(event) => setValues({ ...values, salaryRange: event.target.value })}
        />
      </div>
      <Textarea
        label="Notes"
        value={values.notes ?? ''}
        onChange={(event) => setValues({ ...values, notes: event.target.value })}
      />
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatEnum(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
