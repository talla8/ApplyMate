import { ApplicationSource, ApplicationStatus, JobType, Priority, WorkMode } from '../types';

const labels: Record<string, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  TECHNICAL_TEST: 'Technical Test',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
  REMOTE: 'Remote',
  HYBRID: 'Hybrid',
  ONSITE: 'On-site',
  INTERNSHIP: 'Internship',
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  FREELANCE: 'Freelance',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  LINKEDIN: 'LinkedIn',
  UPWORK: 'Upwork',
  COMPANY_WEBSITE: 'Company Website',
  REFERRAL: 'Referral',
  OTHER: 'Other',
};

export function formatEnum(
  value:
    | ApplicationStatus
    | WorkMode
    | JobType
    | Priority
    | ApplicationSource
    | string,
) {
  return labels[value] ?? value;
}

export function formatDate(value?: string | null) {
  if (!value) {
    return 'Not set';
  }

  return new Date(value).toLocaleDateString();
}
