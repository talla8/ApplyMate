import {
  ApplicationSource,
  ApplicationStatus,
  JobType,
  Priority,
  WorkMode,
} from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class ApplicationFieldsDto {
  @IsNotEmpty()
  @IsString()
  companyName!: string;

  @IsNotEmpty()
  @IsString()
  jobTitle!: string;

  @IsOptional()
  @IsUrl()
  jobLink?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsEnum(WorkMode)
  workMode!: WorkMode;

  @IsEnum(JobType)
  jobType!: JobType;

  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;

  @IsEnum(Priority)
  priority!: Priority;

  @IsOptional()
  @IsDateString()
  appliedDate?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsEnum(ApplicationSource)
  source!: ApplicationSource;

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
