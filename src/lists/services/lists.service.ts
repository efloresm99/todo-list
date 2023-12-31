import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '@Entities';
import { PaginationQueryDto } from '@Common/dtos';
import { RequestUser } from '@Common/types';

import { CreateListDto, UpdateListDto } from '../dtos';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private readonly listsRepository: Repository<List>,
  ) {}

  async createList(
    user: RequestUser,
    createListDto: CreateListDto,
  ): Promise<List> {
    const { id } = user;
    const listToSave = this.listsRepository.create({
      ...createListDto,
      owner: {
        id,
      },
    });
    return this.listsRepository.save(listToSave);
  }

  async getUserLists(
    user: RequestUser,
    pagination: PaginationQueryDto,
  ): Promise<[List[], number]> {
    const { id } = user;
    const { limit: take, offset: skip } = pagination;
    return this.listsRepository.findAndCount({
      where: {
        owner: {
          id,
        },
      },
      take,
      skip,
    });
  }

  async getListById(user: RequestUser, listId: number): Promise<List> {
    const { id: userId } = user;
    const list = await this.listsRepository.findOne({
      where: {
        id: listId,
        owner: {
          id: userId,
        },
      },
    });
    if (!list) {
      throw new NotFoundException(`List, Id ${listId}, Not Found`);
    }

    return list;
  }

  async updateList(
    user: RequestUser,
    listId: number,
    updateListDto: UpdateListDto,
  ): Promise<List> {
    const list = await this.getListById(user, listId);
    const { name, description } = updateListDto;
    list.name = name ?? list.name;
    list.description = description ?? list.description;
    return this.listsRepository.save(list);
  }

  async deleteList(user: RequestUser, listId: number): Promise<void> {
    const { id } = user;
    const deletedList = await this.listsRepository.delete({
      id: listId,
      owner: {
        id,
      },
    });
    if (!deletedList.affected) {
      throw new NotFoundException(`List, id ${listId}, Not Found`);
    }
  }
}
