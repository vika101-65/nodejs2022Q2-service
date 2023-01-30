import 'dotenv/config';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';

const config = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [resolve(`${__dirname}/../src/**/*.entity{.ts,.js}`)],
  migrations: [resolve(`${__dirname}/../src/migrations/*{.ts,.js}`)],
  migrationsTableName: 'migrations',
  logging: true,
  synchronize: false,
  // migrationsRun: true,
});

export default config;
