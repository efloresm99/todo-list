import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from '@Config/typeorm/ormconfig';

import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options), UsersModule],
})
export class AppModule {}
