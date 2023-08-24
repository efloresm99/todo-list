import * as crypto from 'crypto';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@Auth/controllers';
import { AuthService } from '@Auth/services';
import { UsersModule } from '@Users/users.module';

import { LocalStrategy } from './strategies';

const tokenJti = crypto.randomUUID();
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h', jwtid: tokenJti },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
