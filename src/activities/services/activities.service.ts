import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Activity } from '@Entities';
import { ListsService } from '@Lists/services';
import { CreateActivityDto } from '@Activities/dtos';
import { NumericIdDto, PaginationQueryDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';

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
}
