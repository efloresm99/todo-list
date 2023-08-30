import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Activity } from '@Entities';
import { ListsService } from '@Lists/services';
import { CreateActivityDto, DeleteBulkActivitiesDto } from '@Activities/dtos';
import { NumericIdDto, PaginationQueryDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';
import { getNotFoundIds } from '@Common/utils';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepository: Repository<Activity>,
    private readonly listsService: ListsService,
  ) {}

  async createActivity(
    user: RequestUser,
    listId: NumericIdDto,
    createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    await this.listsService.getListById(user, listId.id);
    const activityToCreate = this.activitiesRepository.create({
      ...createActivityDto,
      list: {
        id: listId.id,
      },
    });
    return this.activitiesRepository.save(activityToCreate);
  }

  async getListActivities(
    user: RequestUser,
    listId: NumericIdDto,
    paginationDto: PaginationQueryDto,
  ): Promise<[Activity[], number]> {
    await this.listsService.getListById(user, listId.id);
    const { limit: take, offset: skip } = paginationDto;
    return this.activitiesRepository.findAndCount({
      where: {
        list: {
          id: listId.id,
        },
      },
      take,
      skip,
    });
  }

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

  async deleteActivity(
    user: RequestUser,
    activityId: NumericIdDto,
  ): Promise<void> {
    const activity = await this.getActivityById(user, activityId.id);
    await this.activitiesRepository.remove(activity);
  }

  async deleteManyActivities(
    user: RequestUser,
    deleteBulkActivitiesDto: DeleteBulkActivitiesDto,
  ): Promise<void> {
    const { activityIds } = deleteBulkActivitiesDto;
    const activities = await this.getManyActivitiesByIds(user, activityIds);
    await this.activitiesRepository.remove(activities);
  }
}
