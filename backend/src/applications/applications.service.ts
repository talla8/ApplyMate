import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { QueryApplicationsDto } from './dto/query-applications.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query: QueryApplicationsDto) {
    return this.prisma.application.findMany({
      where: {
        userId,
        status: query.status,
        jobType: query.jobType,
        workMode: query.workMode,
        ...(query.search
          ? {
              OR: [
                { companyName: { contains: query.search } },
                { jobTitle: { contains: query.search } },
              ],
            }
          : {}),
      },
      include: {
        reminders: {
          orderBy: { reminderDate: 'asc' },
        },
        contacts: true,
        checklist: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        reminders: {
          orderBy: { reminderDate: 'asc' },
        },
        contacts: {
          orderBy: { createdAt: 'desc' },
        },
        checklist: true,
      },
    });

    this.ensureOwnership(application, userId);
    return application;
  }

  async create(userId: string, dto: CreateApplicationDto) {
    return this.prisma.application.create({
      data: {
        userId,
        companyName: dto.companyName,
        jobTitle: dto.jobTitle,
        jobLink: dto.jobLink,
        location: dto.location,
        workMode: dto.workMode,
        jobType: dto.jobType,
        status: dto.status,
        priority: dto.priority,
        appliedDate: dto.appliedDate ? new Date(dto.appliedDate) : null,
        deadline: dto.deadline ? new Date(dto.deadline) : null,
        source: dto.source,
        salaryRange: dto.salaryRange,
        notes: dto.notes,
        checklist: {
          create: {},
        },
      },
      include: {
        checklist: true,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateApplicationDto) {
    await this.findOne(userId, id);

    return this.prisma.application.update({
      where: { id },
      data: this.mapApplicationData(dto),
      include: {
        reminders: true,
        contacts: true,
        checklist: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.application.delete({
      where: { id },
    });

    return { message: 'Application deleted successfully.' };
  }

  async getChecklist(userId: string, applicationId: string) {
    const application = await this.findOne(userId, applicationId);
    if (!application) {
      throw new NotFoundException('Application not found.');
    }
    return application.checklist ?? null;
  }

  async updateChecklist(
    userId: string,
    applicationId: string,
    dto: UpdateChecklistDto,
  ) {
    await this.findOne(userId, applicationId);

    return this.prisma.documentChecklist.upsert({
      where: { applicationId },
      update: dto,
      create: {
        applicationId,
        ...dto,
      },
    });
  }

  async ensureUserOwnsApplication(userId: string, applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
    });

    this.ensureOwnership(application, userId);
    return application;
  }

  async ensureUserOwnsReminder(userId: string, reminderId: string) {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id: reminderId },
      include: { application: true },
    });

    if (!reminder) {
      throw new NotFoundException('Reminder not found.');
    }

    if (reminder.application.userId !== userId) {
      throw new ForbiddenException('You do not have access to this reminder.');
    }

    return reminder;
  }

  async ensureUserOwnsContact(userId: string, contactId: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: contactId },
      include: { application: true },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }

    if (contact.application.userId !== userId) {
      throw new ForbiddenException('You do not have access to this contact.');
    }

    return contact;
  }

  private ensureOwnership(
    application: { userId: string } | null,
    userId: string,
  ) {
    if (!application) {
      throw new NotFoundException('Application not found.');
    }

    if (application.userId !== userId) {
      throw new ForbiddenException('You do not have access to this application.');
    }
  }

  private mapApplicationData(dto: UpdateApplicationDto): Prisma.ApplicationUpdateInput {
    return {
      ...dto,
      appliedDate:
        dto.appliedDate === undefined
          ? undefined
          : dto.appliedDate
            ? new Date(dto.appliedDate)
            : null,
      deadline:
        dto.deadline === undefined
          ? undefined
          : dto.deadline
            ? new Date(dto.deadline)
            : null,
    };
  }
}
