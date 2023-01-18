import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDataUser: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({ ...createDataUser, version: 1 });
  }

  async updateUser(
    id: string,
    updateDataUser: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOneUser(id);

    const newUser = { ...user };

    if (!user) {
      throw new HttpException('USER NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updateDataUser.oldPassword) {
      throw new HttpException(
        'Old password is not correct',
        HttpStatus.FORBIDDEN,
      );
    }

    newUser.password = updateDataUser.newPassword;
    newUser.version = user.version + 1;
    await this.usersRepository.update(id, newUser);
    return await this.findOneUser(id);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneUser(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('USER NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async removeUser(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('USER NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(id);
  }
}
