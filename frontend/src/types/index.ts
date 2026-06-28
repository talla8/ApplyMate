export type ApplicationStatus =
  | 'SAVED'
  | 'APPLIED'
  | 'INTERVIEW'
  | 'TECHNICAL_TEST'
  | 'OFFER'
  | 'REJECTED';

export type WorkMode = 'REMOTE' | 'HYBRID' | 'ONSITE';
export type JobType = 'INTERNSHIP' | 'FULL_TIME' | 'PART_TIME' | 'FREELANCE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type ApplicationSource =
  | 'LINKEDIN'
  | 'UPWORK'
  | 'COMPANY_WEBSITE'
  | 'REFERRAL'
  | 'OTHER';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  applicationId: string;
  title: string;
  reminderDate: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  application?: Pick<Application, 'id' | 'companyName' | 'jobTitle' | 'status'>;
}

export interface Contact {
  id: string;
  applicationId: string;
  name: string;
  role?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentChecklist {
  id: string;
  applicationId: string;
  cvSubmitted: boolean;
  coverLetterSubmitted: boolean;
  portfolioSubmitted: boolean;
  githubSubmitted: boolean;
  notes?: string | null;
}

export interface Application {
  id: string;
  userId: string;
  companyName: string;
  jobTitle: string;
  jobLink?: string | null;
  location?: string | null;
  workMode: WorkMode;
  jobType: JobType;
  status: ApplicationStatus;
  priority: Priority;
  appliedDate?: string | null;
  deadline?: string | null;
  source: ApplicationSource;
  salaryRange?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  reminders?: Reminder[];
  contacts?: Contact[];
  checklist?: DocumentChecklist | null;
}

export interface DashboardSummary {
  cards: {
    totalApplications: number;
    applied: number;
    interviewing: number;
    rejected: number;
    offers: number;
    savedOpportunities: number;
  };
  recentApplications: Application[];
  upcomingFollowUps: Reminder[];
  applicationsByStatus: Array<{
    status: ApplicationStatus;
    count: number;
  }>;
}

export interface AuthResponse {
  token: string;
  user: User;
}
