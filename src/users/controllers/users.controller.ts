import { Body, Controller, Post } from '@nestjs/common';

import { serializeResponse } from '@Common/utils';

import { CreateUserDto } from '../dto';
import { UsersService } from '../services';
import { UserDoc } from '../docs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDoc> {
    const savedUser = await this.usersService.createUser(createUserDto);
    return serializeResponse(UserDoc, savedUser);
  }
}
