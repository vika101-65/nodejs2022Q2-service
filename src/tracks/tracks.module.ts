import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TrackEntity } from './entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesService } from 'src/favorites/favorites.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => FavoritesModule),
  ],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
