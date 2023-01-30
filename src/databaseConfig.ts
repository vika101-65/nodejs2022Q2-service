import { resolve } from 'node:path';
import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from './users/entity/user.entity';

export default registerAs(
  'database',
  (): PostgresConnectionOptions =>
    ({
      logging: false,
      entities: [resolve(`${__dirname}/../dist/**/*.entity{.ts,.js}`)],
      migrations: [resolve(`${__dirname}/../dist/migrations/*{.ts,.js}`)],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      keepConnectionAlive: true,
      synchronize: false,
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
    } as PostgresConnectionOptions),
);
