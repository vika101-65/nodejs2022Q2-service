import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/createArtist.dto';
import { ArtistEntity } from './entity/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return await this.artistsRepository.save(createArtistDto);
  }

  async updateArtist(
    id: string,
    updateDataArtist: CreateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('ARTIST NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.artistsRepository.update(id, updateDataArtist);
    return await this.artistsRepository.findOneBy({ id });
  }

  async findAllArtists(): Promise<ArtistEntity[]> {
    return await this.artistsRepository.find();
  }

  async findOneArtist(id: string): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('ARTIST NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async removeArtist(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('ARTIST NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.delete('artists', id);
    await this.artistsRepository.delete(id);
  }
}
