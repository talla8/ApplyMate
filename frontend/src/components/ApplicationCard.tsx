import { Link } from 'react-router-dom';
import { Application } from '../types';
import { formatDate, formatEnum } from '../utils/format';
import { StatusBadge } from './StatusBadge';

export function ApplicationCard({ application }: { application: Application }) {
  return (
    <Link
      to={`/applications/${application.id}`}
      className="school-panel block rounded-[2rem] p-5 transition hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-ink-900">{application.companyName}</p>
          <p className="text-sm text-ink-700">{application.jobTitle}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-700">
        <span className="rounded-full bg-brand-50 px-3 py-1">{formatEnum(application.workMode)}</span>
        <span className="rounded-full bg-accent-50 px-3 py-1">{formatEnum(application.jobType)}</span>
        <span className="rounded-full bg-brand-100 px-3 py-1">{formatEnum(application.priority)}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-ink-700">
        <span>{application.location || 'Location not set'}</span>
        <span>{formatDate(application.appliedDate)}</span>
      </div>
    </Link>
  );
}
