import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { ReturnUserDto } from './dto/returnUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDataUser: CreateUserDto): Promise<ReturnUserDto> {
    const createdAt = Date.now();

    const user = await this.usersRepository.save({
      ...createDataUser,
      createdAt,
      updatedAt: createdAt,
      version: 1,
    });

    const {
      id,
      login,
      createdAt: dateNow,
      updatedAt: update,
      version: v,
    } = user;

    return {
      id,
      login,
      version: v,
      createdAt: dateNow,
      updatedAt: update,
    };
  }

  async updateUser(
    id: string,
    updateDataUser: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt', 'password'],
    });

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
    newUser.updatedAt = Date.now();

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
