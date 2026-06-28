import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { RemindersService } from './reminders.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get('reminders')
  findAll(@CurrentUser() user: Express.User) {
    return this.remindersService.findAll(user.sub);
  }

  @Post('applications/:applicationId/reminders')
  create(
    @CurrentUser() user: Express.User,
    @Param('applicationId') applicationId: string,
    @Body() dto: CreateReminderDto,
  ) {
    return this.remindersService.create(user.sub, applicationId, dto);
  }

  @Patch('reminders/:id')
  update(
    @CurrentUser() user: Express.User,
    @Param('id') id: string,
    @Body() dto: UpdateReminderDto,
  ) {
    return this.remindersService.update(user.sub, id, dto);
  }

  @Delete('reminders/:id')
  remove(@CurrentUser() user: Express.User, @Param('id') id: string) {
    return this.remindersService.remove(user.sub, id);
  }
}
