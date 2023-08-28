import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { InvalidToken } from '@Entities';
import { UsersService } from '@Users/services';
import { RequestUser } from '@Common/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(InvalidToken)
    private readonly invalidTokenRepository: Repository<InvalidToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, providedPassword: string): Promise<any> {
    const user = await this.usersService.getOneUserForAuth(email);
    const passwordIsCorrect = await bcrypt.compare(
      providedPassword,
      user?.password || '',
    );

    if (user && passwordIsCorrect) {
      const { id, firstName, lastName, email } = user;
      return {
        id,
        firstName,
        lastName,
        email,
      };
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async logout(userReq: RequestUser): Promise<void> {
    const tokenToInvalidate = this.invalidTokenRepository.create({
      jti: userReq.jti,
      user: {
        id: userReq.id,
      },
    });
    await this.invalidTokenRepository.save(tokenToInvalidate);
  }
}
