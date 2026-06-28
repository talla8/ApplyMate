import { Module } from '@nestjs/common';
import { ApplicationsModule } from '../applications/applications.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [ApplicationsModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
