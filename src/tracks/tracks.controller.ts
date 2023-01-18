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
import { get } from 'http';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entity/track.entity';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getTracks(): Promise<TrackEntity[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<TrackEntity> {
    return this.tracksService.getOneTrack(id);
  }

  @Post()
  createTrack(@Body() createDataTrack: TrackDto): Promise<TrackEntity> {
    return this.tracksService.createTrack(createDataTrack);
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() upDataTrack: TrackDto,
  ): Promise<TrackEntity> {
    return this.tracksService.upDateTrack(id, upDataTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.removeTrack(id);
  }
}
