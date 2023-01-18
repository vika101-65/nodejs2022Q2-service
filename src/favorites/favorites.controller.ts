import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoriteEntity } from './etity/favorite.entity';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('/track/:id')
  addTrackToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('/album/:id')
  addAlbumToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('/artist/:id')
  addArtistToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FavoriteEntity> {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteArtistFromFavorites(id);
  }

  @Get()
  getFavoritesEntity() {console.log('++++++++')
    return this.favoritesService.getFavorites();
  }
}
