import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateReminderDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  reminderDate?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}
