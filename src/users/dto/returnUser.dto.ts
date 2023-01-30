import { IsNumber, IsString } from 'class-validator';

export class ReturnUserDto {
  @IsString()
  id: string;

  @IsString()
  login: string;

  @IsNumber()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}
