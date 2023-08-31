import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ActivitiesService } from '@Activities/services';
import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { NumericIdDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';
import {
  DeleteBulkActivitiesDto,
  UpdateActivityDto,
  UpdateStatusDto,
} from '@Activities/dtos';
import { ActivityDoc } from '@Activities/docs';

@UseGuards(AuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteManyActivities(
    @User() user: RequestUser,
    @Body() deleteBulkActivitiesDto: DeleteBulkActivitiesDto,
  ): Promise<void> {
    await this.activitiesService.deleteManyActivities(
      user,
      deleteBulkActivitiesDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteActivity(
    @User() user: RequestUser,
    @Param() activityId: NumericIdDto,
  ): Promise<void> {
    await this.activitiesService.deleteActivity(user, activityId);
  }

  @Patch(':id')
  async updateActivity(
    @User() user: RequestUser,
    @Param() idDto: NumericIdDto,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityDoc> {
    const updatedActivity = await this.activitiesService.updateActivity(
      user,
      idDto.id,
      updateActivityDto,
    );
    return plainToInstance(ActivityDoc, updatedActivity, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id/status')
  async updateActivityStatus(
    @User() user: RequestUser,
    @Param() idDto: NumericIdDto,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<ActivityDoc> {
    const updatedStatus = await this.activitiesService.updateActivityStatus(
      user,
      idDto.id,
      updateStatusDto,
    );
    return plainToInstance(ActivityDoc, updatedStatus, {
      excludeExtraneousValues: true,
    });
  }
}
