import { ApplicationStatus } from '../types';
import { formatEnum } from '../utils/format';

const styles: Record<ApplicationStatus, string> = {
  SAVED: 'bg-brand-100 text-brand-700',
  APPLIED: 'bg-[#d8ebf8] text-[#2f5f91]',
  INTERVIEW: 'bg-accent-100 text-accent-500',
  TECHNICAL_TEST: 'bg-[#ffd9be] text-[#b95f1d]',
  OFFER: 'bg-[#dff2da] text-brand-700',
  REJECTED: 'bg-[#fde1dc] text-[#bf5a4a]',
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {formatEnum(status)}
    </span>
  );
}
