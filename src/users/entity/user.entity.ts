import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumberTransformer } from '../transformer/ columnNumber.transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column('int')
  version: number;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: new ColumnNumberTransformer(),
  })
  createdAt: number;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: new ColumnNumberTransformer(),
  })
  updatedAt: number;
}
