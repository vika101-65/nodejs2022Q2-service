import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
