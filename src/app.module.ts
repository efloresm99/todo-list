import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from '@Config/typeorm/ormconfig';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options), UsersModule, AuthModule],
})
export class AppModule {}
