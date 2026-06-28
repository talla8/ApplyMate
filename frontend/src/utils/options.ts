import { ApplicationSource, ApplicationStatus, JobType, Priority, WorkMode } from '../types';

export const statusOptions: ApplicationStatus[] = [
  'SAVED',
  'APPLIED',
  'INTERVIEW',
  'TECHNICAL_TEST',
  'OFFER',
  'REJECTED',
];

export const workModeOptions: WorkMode[] = ['REMOTE', 'HYBRID', 'ONSITE'];
export const jobTypeOptions: JobType[] = ['INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'FREELANCE'];
export const priorityOptions: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];
export const sourceOptions: ApplicationSource[] = [
  'LINKEDIN',
  'UPWORK',
  'COMPANY_WEBSITE',
  'REFERRAL',
  'OTHER',
];
