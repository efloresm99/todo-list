import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@Entities';

import { UsersController } from './controllers';
import { UsersService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'VERIFICATION',
        transport: Transport.TCP,
        options: {
          host: process.env.VERIFICATION_HOST,
          port: +process.env.VERIFICATION_PORT,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
