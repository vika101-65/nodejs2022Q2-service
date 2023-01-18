import { IsArray, IsString } from 'class-validator';

export class FavoriteDto {
  // @IsArray()
  @IsString()
  artists: string[];

  @IsString()
  // @IsArray()
  albums: string[];

  @IsString()
  // @IsArray()
  tracks: string[];
}
