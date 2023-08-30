import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from '@Config/typeorm/ormconfig';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig.options),
    UsersModule,
    AuthModule,
    ListsModule,
    ActivitiesModule,
  ],
})
export class AppModule {}
