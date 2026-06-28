import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsDateString()
  reminderDate!: string;
}
