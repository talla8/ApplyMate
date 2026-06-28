import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { QueryApplicationsDto } from './dto/query-applications.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';

@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  findAll(
    @CurrentUser() user: Express.User,
    @Query() query: QueryApplicationsDto,
  ) {
    return this.applicationsService.findAll(user.sub, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: Express.User, @Param('id') id: string) {
    return this.applicationsService.findOne(user.sub, id);
  }

  @Post()
  create(@CurrentUser() user: Express.User, @Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(user.sub, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: Express.User,
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: Express.User, @Param('id') id: string) {
    return this.applicationsService.remove(user.sub, id);
  }

  @Get(':applicationId/checklist')
  getChecklist(
    @CurrentUser() user: Express.User,
    @Param('applicationId') applicationId: string,
  ) {
    return this.applicationsService.getChecklist(user.sub, applicationId);
  }

  @Patch(':applicationId/checklist')
  updateChecklist(
    @CurrentUser() user: Express.User,
    @Param('applicationId') applicationId: string,
    @Body() dto: UpdateChecklistDto,
  ) {
    return this.applicationsService.updateChecklist(user.sub, applicationId, dto);
  }
}
