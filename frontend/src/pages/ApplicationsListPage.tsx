import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { applicationsApi } from '../api/applications';
import { ApplicationCard } from '../components/ApplicationCard';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { Application, ApplicationStatus, JobType, WorkMode } from '../types';
import { formatEnum } from '../utils/format';
import { jobTypeOptions, statusOptions, workModeOptions } from '../utils/options';

export function ApplicationsListPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [status, setStatus] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (jobType) params.set('jobType', jobType);
    if (workMode) params.set('workMode', workMode);
    if (search) params.set('search', search);
    const text = params.toString();
    return text ? `?${text}` : '';
  }, [jobType, search, status, workMode]);

  useEffect(() => {
    if (!token) return;
    applicationsApi
      .list(token, query)
      .then(setApplications)
      .catch((loadError) =>
        setError(loadError instanceof Error ? loadError.message : 'Unable to load applications.'),
      );
  }, [query, token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Applications</h2>
          <p className="mt-2 text-sm text-slate-500">Search, filter, and review every opportunity in one place.</p>
        </div>
        <Link to="/applications/new">
          <Button>Add Application</Button>
        </Link>
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft md:grid-cols-4">
        <Input label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Company or title" />
        <FilterSelect label="Status" value={status} onChange={setStatus} options={statusOptions} />
        <FilterSelect label="Job Type" value={jobType} onChange={setJobType} options={jobTypeOptions} />
        <FilterSelect label="Work Mode" value={workMode} onChange={setWorkMode} options={workModeOptions} />
      </div>

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {applications.length ? (
          applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        ) : (
          <EmptyState title="No matching applications" description="Try changing your filters or add a new application." />
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<ApplicationStatus | JobType | WorkMode>;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-400"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatEnum(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
