import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '@Entities';
import { RequestUser } from '@Common/types';

import { CreateListDto } from '../dtos';

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
}
