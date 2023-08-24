import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';

const ormconfig = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [join(__dirname, '..', '..', 'entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', 'migrations/*{.ts,.js}')],
});

export default ormconfig;
