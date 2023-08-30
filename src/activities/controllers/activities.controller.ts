import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ActivityDoc } from '@Activities/docs';
import { ActivitiesService } from '@Activities/services';
import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { NumericIdDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';

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
}
