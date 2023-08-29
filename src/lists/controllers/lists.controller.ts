import { plainToInstance } from 'class-transformer';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { RequestUser } from '@Common/types';
import { NumericIdDto, PaginationQueryDto } from '@Common/dtos';
import { serializePaginatedResponse } from '@Common/utils';

import { CreateListDto, UpdateListDto } from '../dtos';
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

  @Get()
  async getUserLists(
    @User() user: RequestUser,
    @Query() paginationDto: PaginationQueryDto,
  ) {
    const listsAndCount = await this.listsService.getUserLists(
      user,
      paginationDto,
    );
    return serializePaginatedResponse(ListDoc, listsAndCount);
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteListById(
    @User() user: RequestUser,
    @Param() numericIdDto: NumericIdDto,
  ): Promise<void> {
    await this.listsService.deleteList(user, numericIdDto.id);
  }
}
