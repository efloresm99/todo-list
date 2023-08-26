import { Controller, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '@Auth/guards';
import { AuthService } from '@Auth/services';
import { User } from '@Common/decorators';
import { RequestUser } from '@Common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: RequestUser) {
    return this.authService.login(user);
  }
}
