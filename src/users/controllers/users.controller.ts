import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../dto';
import { UsersService } from '../services';
import { UserDoc } from '../docs';
import { plainToInstance } from 'class-transformer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Use this endpoint to create a new user',
  })
  @ApiCreatedResponse({
    type: UserDoc,
    description: 'The user was created successfully',
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDoc> {
    const savedUser = await this.usersService.createUser(createUserDto);
    return plainToInstance(UserDoc, savedUser, {
      excludeExtraneousValues: true,
    });
  }
}
