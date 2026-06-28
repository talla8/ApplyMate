import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateChecklistDto {
  @IsOptional()
  @IsBoolean()
  cvSubmitted?: boolean;

  @IsOptional()
  @IsBoolean()
  coverLetterSubmitted?: boolean;

  @IsOptional()
  @IsBoolean()
  portfolioSubmitted?: boolean;

  @IsOptional()
  @IsBoolean()
  githubSubmitted?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
