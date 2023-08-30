import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { List } from '@Entities';
import { UsersModule } from '@Users/users.module';
import { AuthModule } from '@Auth/auth.module';

import { ListsService } from './services';
import { ListsController } from './controllers';
@Module({
  imports: [TypeOrmModule.forFeature([List]), AuthModule, UsersModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
