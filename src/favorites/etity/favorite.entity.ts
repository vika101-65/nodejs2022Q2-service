import { AlbumEntity } from 'src/albums/entity/album.entity';
import { ArtistEntity } from 'src/artists/entity/artist.entity';
import { TrackEntity } from 'src/tracks/entity/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array', { nullable: true })
  // @Column({ array: true })
  artists: string[]; // favorite artists ids\

  @Column('simple-array', { nullable: true })
  // @Column({ array: true })
  albums: string[]; // favorite albums ids

  @Column('simple-array', { nullable: true })
  // @Column({ array: true })
  tracks: string[]; // favorite tracks ids}
}
