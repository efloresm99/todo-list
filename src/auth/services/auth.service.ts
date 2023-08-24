import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@Users/services';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
}
