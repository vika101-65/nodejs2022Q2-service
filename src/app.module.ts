import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesService } from './favorites/favorites.service';
import { FavoritesModule } from './favorites/favorites.module';
import databaseConfig from './databaseConfig';
import { DataSource } from 'typeorm';

const typeOrmConfig = {
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    configService.get('database'),
  dataSourceFactory: async (options) => new DataSource(options).initialize(),
};
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     type: 'postgres',
    //     port: +config.get('TYPEORM_PORT'),
    //     username: config.get('TYPEORM_USERNAME'),
    //     password: config.get('TYPEORM_PASSWORD'),
    //     database: config.get('TYPEORM_DATABASE'),
    //     entities: ['dist/**/*.entity{.ts, .js}'],
    //     synchronize: false,
    //     autoLoadEntities: true,
    //     logging: false,
    //     migrations: ['dist/migrations/*{.ts,.js}'],
    //     migrationsTableName: 'migrations_typeorm',
    //     migrationsRun: true,
    //   }),
    // }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
