import { strict as assert } from 'node:assert';
import test from 'node:test';
import {
  ApplicationSource,
  ApplicationStatus,
  JobType,
  Priority,
  WorkMode,
} from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

test('ApplicationsService.create stores the authenticated user id and initializes checklist', async () => {
  let createArgs: Record<string, unknown> | undefined;

  const prisma = {
    application: {
      create: async (args: Record<string, unknown>) => {
        createArgs = args;
        return {
          id: 'app-1',
          checklist: {},
        };
      },
    },
  };

  const service = new ApplicationsService(prisma as any);

  await service.create('user-1', {
    companyName: 'OpenAI',
    jobTitle: 'Backend Engineer',
    workMode: WorkMode.REMOTE,
    jobType: JobType.FULL_TIME,
    status: ApplicationStatus.APPLIED,
    priority: Priority.HIGH,
    appliedDate: '2026-06-30T00:00:00.000Z',
    deadline: '2026-07-15T00:00:00.000Z',
    source: ApplicationSource.LINKEDIN,
    jobLink: 'https://example.com/jobs/1',
    location: 'Remote',
    salaryRange: '$100k-$120k',
    notes: 'Priority role',
  });

  assert.deepEqual(createArgs, {
    data: {
      userId: 'user-1',
      companyName: 'OpenAI',
      jobTitle: 'Backend Engineer',
      jobLink: 'https://example.com/jobs/1',
      location: 'Remote',
      workMode: WorkMode.REMOTE,
      jobType: JobType.FULL_TIME,
      status: ApplicationStatus.APPLIED,
      priority: Priority.HIGH,
      appliedDate: new Date('2026-06-30T00:00:00.000Z'),
      deadline: new Date('2026-07-15T00:00:00.000Z'),
      source: ApplicationSource.LINKEDIN,
      salaryRange: '$100k-$120k',
      notes: 'Priority role',
      checklist: {
        create: {},
      },
    },
    include: {
      checklist: true,
    },
  });
});

test("ApplicationsService.findOne blocks access to another user's application", async () => {
  const prisma = {
    application: {
      findUnique: async () => ({
        id: 'app-1',
        userId: 'owner-1',
        checklist: null,
        reminders: [],
        contacts: [],
      }),
    },
  };

  const service = new ApplicationsService(prisma as any);

  await assert.rejects(service.findOne('user-2', 'app-1'), ForbiddenException);
});

test('ApplicationsService.findOne returns the application for the owner', async () => {
  const application = {
    id: 'app-1',
    userId: 'user-1',
    checklist: null,
    reminders: [],
    contacts: [],
  };

  const prisma = {
    application: {
      findUnique: async () => application,
    },
  };

  const service = new ApplicationsService(prisma as any);

  const result = await service.findOne('user-1', 'app-1');
  assert.equal(result, application);
});
