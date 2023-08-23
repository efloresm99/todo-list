import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options)],
})
export class AppModule {}
