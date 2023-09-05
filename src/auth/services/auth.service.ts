import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { InvalidToken } from '@Entities';
import { UsersService } from '@Users/services';
import { RequestUser } from '@Common/types';
import { VerifyUserDto } from '@Common/dtos/';
import { CreateVerificationDto } from '@Auth/dtos';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(InvalidToken)
    private readonly invalidTokenRepository: Repository<InvalidToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    providedPassword: string,
    verified = true,
  ): Promise<any> {
    const user = await this.usersService.getOneUserForAuth(email, verified);
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

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<void> {
    await this.usersService.verifyUser(verifyUserDto);
  }

  async createVerification(
    createVerificationDto: CreateVerificationDto,
  ): Promise<string> {
    const { email, password } = createVerificationDto;
    const user = await this.validateUser(email, password, false);
    if (!user) {
      return null;
    }

    const userVerification = await this.usersService.getUserVerification(
      user.email,
    );
    if (!userVerification) {
      const result = await this.usersService.createUserVerification(user.email);
      return await lastValueFrom(result);
    }
  }
}
