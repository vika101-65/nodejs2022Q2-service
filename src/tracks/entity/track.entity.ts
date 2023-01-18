import { AlbumEntity } from 'src/albums/entity/album.entity';
import { ArtistEntity } from 'src/artists/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne((type) => ArtistEntity, (artistEntity) => artistEntity.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity | null; // refers to Artist

  @OneToOne((type) => AlbumEntity, (albumEntity) => albumEntity.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: AlbumEntity | null; // refers to Album

  @Column('int')
  duration: number; // integer number
}
