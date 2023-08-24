import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormconfig } from '@Config/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options)],
})
export class AppModule {}
