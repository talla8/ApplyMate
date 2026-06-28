import { ApplicationStatus, JobType, WorkMode } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryApplicationsDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @IsEnum(WorkMode)
  workMode?: WorkMode;

  @IsOptional()
  @IsString()
  search?: string;
}
