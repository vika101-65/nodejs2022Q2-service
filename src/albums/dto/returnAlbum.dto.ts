import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ReturnAlbumDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  artist: string | null;
}
