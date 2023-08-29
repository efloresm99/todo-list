import { plainToInstance } from 'class-transformer';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { RequestUser } from '@Common/types';

import { CreateListDto } from '../dtos';
import { ListsService } from '../services';
import { ListDoc } from '../docs';

@UseGuards(AuthGuard)
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async createList(
    @User() user: RequestUser,
    @Body() createListDto: CreateListDto,
  ) {
    const list = await this.listsService.createList(user, createListDto);
    return plainToInstance(ListDoc, list, { excludeExtraneousValues: true });
  }
}
