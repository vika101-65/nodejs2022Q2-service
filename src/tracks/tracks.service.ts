import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entity/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(AlbumsService)
    private readonly albumsService: AlbumsService,
    @Inject(ArtistsService)
    private readonly artistsService: ArtistsService,
    @Inject(FavoritesService)
    private readonly favoritesService: FavoritesService,
  ) {}

  async createTrack(createDataTrack: TrackDto): Promise<TrackEntity> {
    const track = new TrackEntity();

    if (createDataTrack.albumId) {
      const album = await this.albumsService.getOneAlbum(
        createDataTrack.albumId,
      );

      if (!album) {
        throw new HttpException('NOT FOUND ALBUM', HttpStatus.NOT_FOUND);
      }

      track.album = album;
    } else {
      track.album = null;
    }

    if (createDataTrack.artistId) {
      const artist = await this.artistsService.findOneArtist(
        createDataTrack.artistId,
      );

      if (!artist) {
        throw new HttpException('NOT FOUND ARTIST', HttpStatus.NOT_FOUND);
      }

      track.artist = artist;
    } else {
      track.artist = null;
    }

    track.name = createDataTrack.name;
    track.duration = createDataTrack.duration;

    return await this.trackRepository.save(track);
  }

  async getAllTracks(): Promise<TrackEntity[]> {
    return this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
    });
  }

  async getOneTrack(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('TRACK NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return this.trackRepository.findOne({
      where: {
        id,
      },
      relations: {
        artist: true,
        album: true,
      },
    });
  }

  async upDateTrack(id: string, upDateTrack: TrackDto): Promise<TrackEntity> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('TRACK NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (upDateTrack.albumId) {
      const album = await this.albumsService.getOneAlbum(upDateTrack.albumId);

      if (!album) {
        throw new HttpException('ALBUM NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      track.album = album;
    } else {
      track.album = null;
    }

    if (upDateTrack.artistId) {
      const artist = await this.artistsService.findOneArtist(
        upDateTrack.artistId,
      );

      if (!artist) {
        throw new HttpException('Artist NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      track.artist = artist;
    } else {
      track.artist = null;
    }

    track.name = upDateTrack.name;
    track.duration = upDateTrack.duration;

    return await this.trackRepository.save(track);
  }

  async removeTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('TRACK NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.delete('tracks', id);

    await this.trackRepository.delete(id);
  }
}
