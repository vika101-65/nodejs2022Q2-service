import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './etity/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  createFavorite() {
    const favorite = new FavoriteEntity();
    favorite.tracks = [];
    favorite.albums = [];
    favorite.artists = [];
    return favorite;
  }

  async getFavorite(): Promise<FavoriteEntity> {
    const favorites = await this.favoriteRepository.find();
    const favorite = favorites[0];
    return favorite;
  }

  async addTrackToFavorites(id: string) {
    let favorite = await this.getFavorite();

    if (!favorite) {
      favorite = this.createFavorite();
    }

    try {
      await this.tracksService.getOneTrack(id);
    } catch (error) {
      throw new HttpException(
        `TTRACK WITH ${id} ID NOT_FOUND`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (favorite.tracks?.length > 0) {
      favorite.tracks.push(id);
    }
    if (!favorite.tracks || favorite.tracks.length === 0) {
      favorite.tracks = [id];
    }

    return await this.favoriteRepository.save(favorite);
  }

  async deleteTrackFromFavorites(id: string): Promise<FavoriteEntity> {
    const favorite = await this.getFavorite();
    const tracks = [...favorite.tracks];
    const newTracks = tracks.filter((trackId) => trackId !== id);

    if (tracks.length === newTracks.length) {
      throw new HttpException(
        `TRACK WITH ${id} ID NOT_FOUND`,
        HttpStatus.NOT_FOUND,
      );
    }
    favorite.tracks = newTracks;
    return this.favoriteRepository.save(favorite);
  }

  async addAlbumToFavorites(id: string): Promise<FavoriteEntity> {
    let favorite = await this.getFavorite();

    if (!favorite) {
      favorite = favorite = this.createFavorite();
    }

    try {
      await this.albumsService.getOneAlbum(id);
    } catch (error) {
      throw new HttpException(
        `ALBUM WITH ${id} ID NOT_FOUND`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (favorite.albums?.length > 0) {
      favorite.albums.push(id);
    }
    if (!favorite.albums || favorite.albums.length === 0) {
      favorite.albums = [id];
    }

    return this.favoriteRepository.save(favorite);
  }

  async deleteAlbumFromFavorites(id: string): Promise<FavoriteEntity> {
    const favorite = await this.getFavorite();
    const albums = [...favorite.albums];
    const newAlbums = albums.filter((albumId) => albumId !== id);

    if (albums.length === newAlbums.length) {
      throw new HttpException(
        `ALBUM WITH ${id} ID NOT_FOUND`,
        HttpStatus.NOT_FOUND,
      );
    }
    favorite.albums = newAlbums;
    return this.favoriteRepository.save(favorite);
  }

  async addArtistToFavorites(id: string): Promise<FavoriteEntity> {
    let favorite = await this.getFavorite();

    if (!favorite) {
      favorite = this.createFavorite();
    }

    try {
      await this.artistsService.findOneArtist(id);
    } catch (error) {
      throw new HttpException(
        `ARTIST WITH ${id} ID NOT_FOUND`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (favorite.artists?.length > 0) {
      favorite.artists.push(id);
    }
    if (!favorite.artists || favorite.artists.length === 0) {
      favorite.artists = [id];
    }

    return await this.favoriteRepository.save(favorite);
  }

  async deleteArtistFromFavorites(id: string): Promise<FavoriteEntity> {
    const favorite = await this.getFavorite();
    const artists = [...favorite.artists];
    const newArtists = artists.filter((artistId) => artistId !== id);

    if (artists.length === newArtists.length) {
      throw new HttpException(
        `ARTIST WITH ${id} ID NOT_FOUND`,
        HttpStatus.NOT_FOUND,
      );
    }
    favorite.artists = newArtists;
    return this.favoriteRepository.save(favorite);
  }

  async delete(type: string, id: string) {
    const favorite = await this.getFavorite();

    if (favorite) {
      const entity = [...favorite[type]];
      const newEntity = entity.filter((entityId) => entityId !== id);

      if (entity.length !== newEntity.length) {
        favorite[type] = newEntity;
        return this.favoriteRepository.save(favorite);
      }
    }
  }

  async getFavorites() {
    const favorite = await this.getFavorite();

    if (!favorite) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    const artistsId = favorite.artists || [];
    const albumsId = favorite.albums || [];
    const tracksId = favorite.tracks || [];

    const artistsPromise = artistsId.map((id) =>
      this.artistsService.findOneArtist(id),
    );

    const albumsPromise = albumsId.map((id) =>
      this.albumsService.getOneAlbum(id),
    );

    const tracksPromise = tracksId.map((id) =>
      this.tracksService.getOneTrack(id),
    );

    const artists = await Promise.all(artistsPromise);
    const albums = await Promise.all(albumsPromise);
    const tracks = await Promise.all(tracksPromise);

    const newAlbums = albums.map((item) => ({
      ...item,
      artist: item.artist ? item.artist.id : null,
    }));
    const newTracks = tracks.map((item) => ({
      ...item,
      artist: item.artist ? item.artist.id : null,
      album: item.album ? item.album.id : null,
    }));

    const favorites = {
      id: favorite.id,
      artists,
      albums: newAlbums,
      tracks: newTracks,
    };

    return favorites;
  }
}
