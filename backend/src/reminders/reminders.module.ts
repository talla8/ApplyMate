import { Module } from '@nestjs/common';
import { ApplicationsModule } from '../applications/applications.module';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [ApplicationsModule],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}
