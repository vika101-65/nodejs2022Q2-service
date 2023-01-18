import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async createAlbum(createDataAlbum: AlbumDto): Promise<AlbumEntity> {
    const artist = await this.artistsService.findOneArtist(
      createDataAlbum.artistId,
    );

    const album = new AlbumEntity();
    album.name = createDataAlbum.name;
    album.year = createDataAlbum.year;
    album.artist = artist;
    await this.albumRepository.save(album);

    return await this.albumRepository.save(album);
  }

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumRepository.find({
      relations: {
        artist: true,
      },
    });
  }

  async getOneAlbum(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('ALBUM NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return this.albumRepository.findOne({
      where: {
        id,
      },
      relations: {
        artist: true,
      },
    });
  }

  async upDateAlbum(id: string, upDataAlbumb: AlbumDto): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('ALBUM NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (upDataAlbumb.artistId) {
      const artist = await this.artistsService.findOneArtist(
        upDataAlbumb.artistId,
      );

      if (!artist) {
        throw new HttpException('ARTIST NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      album.artist = artist;
    }

    album.name = upDataAlbumb.name;
    album.year = upDataAlbumb.year;

    return await this.albumRepository.save(album);
  }

  async removeAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('ALBUM NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.delete('albums', id);

    await this.albumRepository.delete(id);
  }
}
