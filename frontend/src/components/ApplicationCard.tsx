import { Link } from 'react-router-dom';
import { Application } from '../types';
import { formatDate, formatEnum } from '../utils/format';
import { StatusBadge } from './StatusBadge';

export function ApplicationCard({ application }: { application: Application }) {
  return (
    <Link
      to={`/applications/${application.id}`}
      className="block rounded-3xl border border-brand-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-slate-900">{application.companyName}</p>
          <p className="text-sm text-slate-500">{application.jobTitle}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        <span className="rounded-full bg-brand-50 px-3 py-1">{formatEnum(application.workMode)}</span>
        <span className="rounded-full bg-brand-50 px-3 py-1">{formatEnum(application.jobType)}</span>
        <span className="rounded-full bg-brand-50 px-3 py-1">{formatEnum(application.priority)}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{application.location || 'Location not set'}</span>
        <span>{formatDate(application.appliedDate)}</span>
      </div>
    </Link>
  );
}
