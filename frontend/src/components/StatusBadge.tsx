import { ApplicationStatus } from '../types';
import { formatEnum } from '../utils/format';

const styles: Record<ApplicationStatus, string> = {
  SAVED: 'bg-slate-100 text-slate-700',
  APPLIED: 'bg-sky-100 text-sky-700',
  INTERVIEW: 'bg-amber-100 text-amber-800',
  TECHNICAL_TEST: 'bg-orange-100 text-orange-800',
  OFFER: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-rose-100 text-rose-700',
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {formatEnum(status)}
    </span>
  );
}
