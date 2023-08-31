import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ListsService } from '@Lists/services';
import { Activity } from '@Entities';
import { CreateActivityDto } from '@Activities/dtos';
import { NumericIdDto, PaginationQueryDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';

@Injectable()
export class ListActivitiesService {
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

  async deleteCompletedActivities(
    user: RequestUser,
    idDto: NumericIdDto,
  ): Promise<void> {
    const activities = await this.activitiesRepository.find({
      where: {
        completed: true,
        list: {
          id: idDto.id,
          owner: {
            id: user.id,
          },
        },
      },
    });
    if (!activities.length) {
      throw new NotFoundException(
        'No incomplete activities were found for the list',
      );
    }
    await this.activitiesRepository.remove(activities);
  }
}
