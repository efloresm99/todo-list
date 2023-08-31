import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { List } from '@Entities';
import { UsersModule } from '@Users/users.module';
import { AuthModule } from '@Auth/auth.module';

import { ListListenerService, ListsService } from './services';
import { ListsController } from './controllers';
import { ListListener } from './listeners';
@Module({
  imports: [TypeOrmModule.forFeature([List]), AuthModule, UsersModule],
  controllers: [ListsController],
  providers: [ListsService, ListListener, ListListenerService],
  exports: [ListsService],
})
export class ListsModule {}
