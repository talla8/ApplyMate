import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsService } from '../applications/applications.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly applicationsService: ApplicationsService,
  ) {}

  async findAll(userId: string) {
    return this.prisma.reminder.findMany({
      where: {
        application: {
          userId,
        },
      },
      include: {
        application: {
          select: {
            id: true,
            companyName: true,
            jobTitle: true,
            status: true,
          },
        },
      },
      orderBy: [{ isDone: 'asc' }, { reminderDate: 'asc' }],
    });
  }

  async create(userId: string, applicationId: string, dto: CreateReminderDto) {
    await this.applicationsService.ensureUserOwnsApplication(userId, applicationId);

    return this.prisma.reminder.create({
      data: {
        applicationId,
        title: dto.title,
        reminderDate: new Date(dto.reminderDate),
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateReminderDto) {
    await this.applicationsService.ensureUserOwnsReminder(userId, id);

    return this.prisma.reminder.update({
      where: { id },
      data: {
        ...dto,
        reminderDate:
          dto.reminderDate === undefined ? undefined : new Date(dto.reminderDate),
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.applicationsService.ensureUserOwnsReminder(userId, id);

    await this.prisma.reminder.delete({
      where: { id },
    });

    return { message: 'Reminder deleted successfully.' };
  }
}
