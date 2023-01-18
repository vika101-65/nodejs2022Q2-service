import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    forwardRef(() => FavoritesModule),
  ],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [ArtistsService],
})
export class ArtistsModule {}
