import {
  ApplicationSource,
  ApplicationStatus,
  JobType,
  Priority,
  PrismaClient,
  WorkMode,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@applymate.com';
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.reminder.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.documentChecklist.deleteMany();
  await prisma.application.deleteMany();
  await prisma.user.deleteMany({ where: { email } });

  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email,
      passwordHash,
      applications: {
        create: [
          {
            companyName: 'LaunchLayer',
            jobTitle: 'Junior Frontend Developer',
            jobLink: 'https://example.com/launchlayer-frontend',
            location: 'Amman, Jordan',
            workMode: WorkMode.REMOTE,
            jobType: JobType.FULL_TIME,
            status: ApplicationStatus.APPLIED,
            priority: Priority.HIGH,
            appliedDate: new Date('2026-06-12'),
            deadline: new Date('2026-07-02'),
            source: ApplicationSource.LINKEDIN,
            salaryRange: '$900 - $1,200',
            notes: 'Reached out to the recruiter after applying.',
            checklist: {
              create: {
                cvSubmitted: true,
                coverLetterSubmitted: true,
                portfolioSubmitted: true,
                githubSubmitted: true,
                notes: 'Tailored frontend resume.',
              },
            },
            reminders: {
              create: [
                {
                  title: 'Send follow-up email',
                  reminderDate: new Date('2026-06-30'),
                },
              ],
            },
            contacts: {
              create: [
                {
                  name: 'Maya Hasan',
                  role: 'Recruiter',
                  email: 'maya@example.com',
                  linkedinUrl: 'https://linkedin.com/in/mayahasan',
                  notes: 'Responded positively to LinkedIn message.',
                },
              ],
            },
          },
          {
            companyName: 'CodeTrail',
            jobTitle: 'Backend Intern',
            location: 'Dubai, UAE',
            workMode: WorkMode.HYBRID,
            jobType: JobType.INTERNSHIP,
            status: ApplicationStatus.INTERVIEW,
            priority: Priority.MEDIUM,
            appliedDate: new Date('2026-06-05'),
            deadline: new Date('2026-07-10'),
            source: ApplicationSource.COMPANY_WEBSITE,
            notes: 'First interview completed well.',
            checklist: {
              create: {
                cvSubmitted: true,
                coverLetterSubmitted: false,
                portfolioSubmitted: false,
                githubSubmitted: true,
              },
            },
            reminders: {
              create: [
                {
                  title: 'Prepare API design examples',
                  reminderDate: new Date('2026-07-01'),
                },
              ],
            },
          },
          {
            companyName: 'PixelForge',
            jobTitle: 'React Developer',
            location: 'Remote',
            workMode: WorkMode.REMOTE,
            jobType: JobType.FREELANCE,
            status: ApplicationStatus.SAVED,
            priority: Priority.LOW,
            source: ApplicationSource.UPWORK,
            notes: 'Saved for later review.',
            checklist: {
              create: {},
            },
          },
          {
            companyName: 'Northstar Tech',
            jobTitle: 'Graduate Software Engineer',
            location: 'Riyadh, Saudi Arabia',
            workMode: WorkMode.ONSITE,
            jobType: JobType.FULL_TIME,
            status: ApplicationStatus.OFFER,
            priority: Priority.HIGH,
            appliedDate: new Date('2026-05-20'),
            source: ApplicationSource.REFERRAL,
            salaryRange: '$1,800 - $2,300',
            checklist: {
              create: {
                cvSubmitted: true,
                coverLetterSubmitted: true,
                portfolioSubmitted: true,
                githubSubmitted: true,
              },
            },
          },
          {
            companyName: 'StackSpring',
            jobTitle: 'Junior Full Stack Developer',
            location: 'Cairo, Egypt',
            workMode: WorkMode.HYBRID,
            jobType: JobType.FULL_TIME,
            status: ApplicationStatus.REJECTED,
            priority: Priority.MEDIUM,
            appliedDate: new Date('2026-05-08'),
            source: ApplicationSource.OTHER,
            notes: 'Rejected after final round.',
            checklist: {
              create: {
                cvSubmitted: true,
                coverLetterSubmitted: true,
                portfolioSubmitted: true,
                githubSubmitted: false,
              },
            },
          },
        ],
      },
    },
  });

  console.log(`Seeded demo user: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
