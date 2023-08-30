import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from '@Entities';
import { AuthModule } from '@Auth/auth.module';
import { ListsModule } from '@Lists/lists.module';
import { UsersModule } from '@Users/users.module';

import { ListActivitiesController } from './controllers';
import { ActivitiesService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    ListsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [ListActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
