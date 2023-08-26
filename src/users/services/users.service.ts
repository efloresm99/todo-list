import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@Entities';

import { CreateUserDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salts = +process.env.PASSWORD_SALTS;
    const { password: unencryptedPassword, ...userData } = createUserDto;
    const password = await bcrypt.hash(unencryptedPassword, salts);
    const userToSave = this.usersRepository.create({
      ...userData,
      password,
    });
    return this.usersRepository.save(userToSave);
  }

  async getOneUserForAuth(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
