import { ArtistEntity } from 'src/artists/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToOne((type) => ArtistEntity, (artistEntity) => artistEntity.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity | null; // refers to Artist
}
