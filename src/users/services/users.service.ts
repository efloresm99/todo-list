import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@Entities';

import { CreateUserDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject('VERIFICATION') private readonly verificationClient: ClientProxy,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salts = +process.env.PASSWORD_SALTS;
    const { password: unencryptedPassword, ...userData } = createUserDto;
    const password = await bcrypt.hash(unencryptedPassword, salts);
    const userToSave = this.usersRepository.create({
      ...userData,
      password,
    });
    const user = await this.usersRepository.save(userToSave);
    const validation = this.verificationClient.send(
      { cmd: 'create_verification' },
      { customId: user.id, format: 'string' },
    );
    const identifier = await lastValueFrom(validation);
    // TODO: send email to user with the identifier
    return user;
  }

  async getOneUserForAuth(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations: {
        invalidTokens: true,
      },
    });
  }
}
