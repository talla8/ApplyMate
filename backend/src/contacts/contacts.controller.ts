import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('applications/:applicationId/contacts')
  create(
    @CurrentUser() user: Express.User,
    @Param('applicationId') applicationId: string,
    @Body() dto: CreateContactDto,
  ) {
    return this.contactsService.create(user.sub, applicationId, dto);
  }

  @Patch('contacts/:id')
  update(
    @CurrentUser() user: Express.User,
    @Param('id') id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactsService.update(user.sub, id, dto);
  }

  @Delete('contacts/:id')
  remove(@CurrentUser() user: Express.User, @Param('id') id: string) {
    return this.contactsService.remove(user.sub, id);
  }
}
