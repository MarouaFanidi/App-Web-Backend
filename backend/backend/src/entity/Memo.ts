import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Table "memo" pour les mémos de stage
@Entity()
export class Memo {
  @PrimaryGeneratedColumn()
  id_memo: number;

  @Column()
  date: Date;

  @Column()
  objet: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  dureeStage: number;

  @Column()
  debutStage: Date;

  @Column()
  finStage: Date;

  @Column()
  sujetStage: string;
}