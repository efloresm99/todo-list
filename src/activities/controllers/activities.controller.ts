import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ActivityDoc } from '@Activities/docs';
import { ActivitiesService } from '@Activities/services';
import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { NumericIdDto, PaginationQueryDto } from '@Common/dtos';
import { PaginatedResponse, RequestUser } from '@Common/types';
import { serializePaginatedResponse } from '@Common/utils';

import { CreateActivityDto } from '../dtos';

@UseGuards(AuthGuard)
@Controller('lists/:id/activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}
  @Post()
  async createActivity(
    @User() user: RequestUser,
    @Param() listId: NumericIdDto,
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<ActivityDoc> {
    const activity = await this.activitiesService.createActivity(
      user,
      listId,
      createActivityDto,
    );
    return plainToInstance(ActivityDoc, activity, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getListActivities(
    @User() user: RequestUser,
    @Param() listId: NumericIdDto,
    @Query() paginationDto: PaginationQueryDto,
  ): Promise<PaginatedResponse<ActivityDoc>> {
    const activitiesAndCount = await this.activitiesService.getListActivities(
      user,
      listId,
      paginationDto,
    );
    return serializePaginatedResponse(ActivityDoc, activitiesAndCount);
  }
}
