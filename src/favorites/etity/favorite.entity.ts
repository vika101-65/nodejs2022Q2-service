import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array', { nullable: true })
  artists: string[];

  @Column('simple-array', { nullable: true })
  albums: string[];

  @Column('simple-array', { nullable: true })
  tracks: string[];
}
