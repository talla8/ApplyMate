import { Injectable } from '@nestjs/common';
import { ApplicationsService } from '../applications/applications.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly applicationsService: ApplicationsService,
  ) {}

  async create(userId: string, applicationId: string, dto: CreateContactDto) {
    await this.applicationsService.ensureUserOwnsApplication(userId, applicationId);

    return this.prisma.contact.create({
      data: {
        applicationId,
        ...dto,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateContactDto) {
    await this.applicationsService.ensureUserOwnsContact(userId, id);

    return this.prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.applicationsService.ensureUserOwnsContact(userId, id);

    await this.prisma.contact.delete({
      where: { id },
    });

    return { message: 'Contact deleted successfully.' };
  }
}
