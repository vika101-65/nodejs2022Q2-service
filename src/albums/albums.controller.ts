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
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { ReturnAlbumDto } from './dto/returnAlbum.dto';
import { AlbumEntity } from './entity/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAlbums(): Promise<AlbumEntity[]> {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumEntity> {
    return this.albumsService.getOneAlbum(id);
  }

  @Post()
  createAlbum(@Body() createDataAlbum: AlbumDto): Promise<AlbumEntity> {
    return this.albumsService.createAlbum(createDataAlbum);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() upDataAlbum: AlbumDto,
  ): Promise<ReturnAlbumDto> {
    return this.albumsService.upDateAlbum(id, upDataAlbum);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.removeAlbum(id);
  }
}
