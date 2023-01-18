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

function defaultOptions(config: ConfigService) {
  return {
    type: 'postgres',
    port: 5432,
    username: config.get('TYPEORM_USERNAME'),
    password: config.get('TYPEORM_PASSWORD'),
    database: 'db',
    synchronize: true,
  };
}
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        port: +config.get('TYPEORM_PORT'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DATABASE'),
        entities: [__dirname, 'dist/**/*.entity{.ts, .js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: 'custom_migration_table',
      }),
    }),
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
