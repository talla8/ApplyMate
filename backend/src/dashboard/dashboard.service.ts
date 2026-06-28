import { Injectable } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(userId: string) {
    const [
      totalApplications,
      applied,
      interviewing,
      rejected,
      offers,
      savedOpportunities,
      recentApplications,
      upcomingFollowUps,
      byStatusRaw,
    ] = await Promise.all([
      this.prisma.application.count({ where: { userId } }),
      this.prisma.application.count({
        where: { userId, status: ApplicationStatus.APPLIED },
      }),
      this.prisma.application.count({
        where: {
          userId,
          status: { in: [ApplicationStatus.INTERVIEW, ApplicationStatus.TECHNICAL_TEST] },
        },
      }),
      this.prisma.application.count({
        where: { userId, status: ApplicationStatus.REJECTED },
      }),
      this.prisma.application.count({
        where: { userId, status: ApplicationStatus.OFFER },
      }),
      this.prisma.application.count({
        where: { userId, status: ApplicationStatus.SAVED },
      }),
      this.prisma.application.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.reminder.findMany({
        where: {
          application: { userId },
          isDone: false,
        },
        include: {
          application: {
            select: {
              id: true,
              companyName: true,
              jobTitle: true,
            },
          },
        },
        orderBy: { reminderDate: 'asc' },
        take: 5,
      }),
      this.prisma.application.groupBy({
        by: ['status'],
        where: { userId },
        _count: { status: true },
      }),
    ]);

    return {
      cards: {
        totalApplications,
        applied,
        interviewing,
        rejected,
        offers,
        savedOpportunities,
      },
      recentApplications,
      upcomingFollowUps,
      applicationsByStatus: byStatusRaw.map((item) => ({
        status: item.status,
        count: item._count.status,
      })),
    };
  }
}
