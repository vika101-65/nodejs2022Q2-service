import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { ArtistEntity } from './entity/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistsService.findAllArtists();
  }

  @Get(':id')
  getOneArtist(@Param('id', ParseUUIDPipe) id: string): Promise<ArtistEntity> {
    return this.artistsService.findOneArtist(id);
  }

  @Post()
  createArtist(
    @Body() createDataArtist: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.createArtist(createDataArtist);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtist: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.updateArtist(id, updateArtist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.removeArtist(id);
  }
}
