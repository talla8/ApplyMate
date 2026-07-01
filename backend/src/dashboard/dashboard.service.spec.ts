import { strict as assert } from 'node:assert';
import test from 'node:test';
import { ApplicationStatus } from '@prisma/client';
import { DashboardService } from './dashboard.service';

test('DashboardService.getSummary returns the expected dashboard counts and summaries', async () => {
  const countCalls: Array<Record<string, unknown>> = [];

  const prisma = {
    application: {
      count: async (args: Record<string, unknown>) => {
        countCalls.push(args);

        if (countCalls.length === 1) return 12;
        if (countCalls.length === 2) return 4;
        if (countCalls.length === 3) return 3;
        if (countCalls.length === 4) return 2;
        if (countCalls.length === 5) return 1;
        return 2;
      },
      findMany: async () => [
        { id: 'app-2', companyName: 'A', jobTitle: 'Engineer' },
        { id: 'app-1', companyName: 'B', jobTitle: 'Developer' },
      ],
      groupBy: async () => [
        { status: ApplicationStatus.APPLIED, _count: { status: 4 } },
        { status: ApplicationStatus.OFFER, _count: { status: 1 } },
      ],
    },
    reminder: {
      findMany: async () => [
        {
          id: 'rem-1',
          title: 'Follow up',
          application: {
            id: 'app-2',
            companyName: 'A',
            jobTitle: 'Engineer',
          },
        },
      ],
    },
  };

  const service = new DashboardService(prisma as any);

  const result = await service.getSummary('user-1');

  assert.deepEqual(countCalls, [
    { where: { userId: 'user-1' } },
    { where: { userId: 'user-1', status: ApplicationStatus.APPLIED } },
    {
      where: {
        userId: 'user-1',
        status: {
          in: [ApplicationStatus.INTERVIEW, ApplicationStatus.TECHNICAL_TEST],
        },
      },
    },
    { where: { userId: 'user-1', status: ApplicationStatus.REJECTED } },
    { where: { userId: 'user-1', status: ApplicationStatus.OFFER } },
    { where: { userId: 'user-1', status: ApplicationStatus.SAVED } },
  ]);

  assert.deepEqual(result, {
    cards: {
      totalApplications: 12,
      applied: 4,
      interviewing: 3,
      rejected: 2,
      offers: 1,
      savedOpportunities: 2,
    },
    recentApplications: [
      { id: 'app-2', companyName: 'A', jobTitle: 'Engineer' },
      { id: 'app-1', companyName: 'B', jobTitle: 'Developer' },
    ],
    upcomingFollowUps: [
      {
        id: 'rem-1',
        title: 'Follow up',
        application: {
          id: 'app-2',
          companyName: 'A',
          jobTitle: 'Engineer',
        },
      },
    ],
    applicationsByStatus: [
      { status: ApplicationStatus.APPLIED, count: 4 },
      { status: ApplicationStatus.OFFER, count: 1 },
    ],
  });
});
