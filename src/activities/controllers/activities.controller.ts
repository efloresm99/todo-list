import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ActivitiesService } from '@Activities/services';
import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { NumericIdDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';
import { DeleteBulkActivitiesDto } from '@Activities/dtos';

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
}
