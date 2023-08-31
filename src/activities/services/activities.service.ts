import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';

import { Activity } from '@Entities';
import {
  BulkActivitiesDto,
  UpdateActivityDto,
  UpdateBulkStatusDto,
  UpdateStatusDto,
} from '@Activities/dtos';
import { NumericIdDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';
import { getNotFoundIds } from '@Common/utils';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepository: Repository<Activity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getActivityById(user: RequestUser, id: number): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({
      where: {
        id,
        list: {
          owner: {
            id: user.id,
          },
        },
      },
    });
    if (!activity) {
      throw new NotFoundException(`Activity, id ${id}, Not Found`);
    }
    return activity;
  }

  async getManyActivitiesByIds(
    user: RequestUser,
    ids: number[],
  ): Promise<Activity[]> {
    const activities = await this.activitiesRepository.find({
      where: {
        id: In(ids),
        list: {
          owner: {
            id: user.id,
          },
        },
      },
    });
    const notAllIdsWereFound = ids.length !== activities.length;
    if (notAllIdsWereFound) {
      const activityIds = activities.map((activity) => Number(activity.id));
      const notFoundIds = getNotFoundIds(ids, activityIds);
      throw new NotFoundException(`Id(s) ${notFoundIds}, Not Found`);
    }
    return activities;
  }

  async updateActivity(
    user: RequestUser,
    activityId: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const activity = await this.getActivityById(user, activityId);
    const { name, description, priority } = updateActivityDto;
    activity.name = name ?? activity.name;
    activity.description = description ?? activity.description;
    activity.priority = priority ?? activity.priority;
    return this.activitiesRepository.save(activity);
  }

  async deleteActivity(
    user: RequestUser,
    activityId: NumericIdDto,
  ): Promise<void> {
    const activity = await this.getActivityById(user, activityId.id);
    await this.activitiesRepository.remove(activity);
  }

  async updateActivityStatus(
    user: RequestUser,
    activityId: number,
    updateStatusDto: UpdateStatusDto,
  ): Promise<Activity> {
    const activity = await this.getActivityById(user, activityId);
    activity.completed = updateStatusDto.completed;
    const savedActivity = await this.activitiesRepository.save(activity);
    this.eventEmitter.emit('list.checkIfListIsFinished', [activityId]);
    return savedActivity;
  }

  async updateManyActivityStatus(
    user: RequestUser,
    updateBulkStatusDto: UpdateBulkStatusDto,
  ): Promise<Activity[]> {
    const { activityIds, completed } = updateBulkStatusDto;
    const activities = await this.getManyActivitiesByIds(user, activityIds);
    const updatedActivities = activities.map((activity) => {
      activity.completed = completed;
      return activity;
    });
    const savedActivities =
      await this.activitiesRepository.save(updatedActivities);
    this.eventEmitter.emit('list.checkIfListIsFinished', activityIds);
    return savedActivities;
  }

  async deleteManyActivities(
    user: RequestUser,
    deleteBulkActivitiesDto: BulkActivitiesDto,
  ): Promise<void> {
    const { activityIds } = deleteBulkActivitiesDto;
    const activities = await this.getManyActivitiesByIds(user, activityIds);
    await this.activitiesRepository.remove(activities);
  }
}
