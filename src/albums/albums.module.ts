import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entity/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => ArtistsModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
