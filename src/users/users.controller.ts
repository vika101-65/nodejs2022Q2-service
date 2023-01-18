import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.usersService.findOneUser(id);
  }

  @Post()
  createUser(@Body() createDataUser: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(createDataUser);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUser(id);
  }
}
