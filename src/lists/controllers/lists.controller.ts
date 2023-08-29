import { plainToInstance } from 'class-transformer';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { RequestUser } from '@Common/types';

import { CreateListDto, UpdateListDto } from '../dtos';
import { ListsService } from '../services';
import { ListDoc } from '../docs';
import { NumericIdDto } from '@Common/dtos';

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

  @Patch(':id')
  async updateList(
    @User() user: RequestUser,
    @Body() updateListDto: UpdateListDto,
    @Param() numericIdDto: NumericIdDto,
  ): Promise<ListDoc> {
    const list = await this.listsService.updateList(
      user,
      numericIdDto.id,
      updateListDto,
    );
    return plainToInstance(ListDoc, list, { excludeExtraneousValues: true });
  }

  @Get(':id')
  async getListById(
    @User() user: RequestUser,
    @Param() numericIdDto: NumericIdDto,
  ): Promise<ListDoc> {
    const list = await this.listsService.getListById(user, numericIdDto.id);
    return plainToInstance(ListDoc, list, { excludeExtraneousValues: true });
  }
}
