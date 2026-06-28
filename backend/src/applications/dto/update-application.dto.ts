import { PartialType } from '@nestjs/mapped-types';
import { ApplicationFieldsDto } from './application-shared';

export class UpdateApplicationDto extends PartialType(ApplicationFieldsDto) {}
