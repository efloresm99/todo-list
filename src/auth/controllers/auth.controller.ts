import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, LocalAuthGuard } from '@Auth/guards';
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete('logout')
  async logout(@User() user: RequestUser): Promise<void> {
    await this.authService.logout(user);
  }
}
