import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Nom de la table dans la base de données
export class Deplacement {
  
  @PrimaryGeneratedColumn()
  id_deplacement: number;  

  @Column()
  origine: string;  

  @Column({ type: 'date' })
  date: Date;  

  @Column()
  destinataires: string;  

  @Column()
  objet: string;  

  @Column({ type: 'text' })
  noteInterne: string;  

  @Column({ type: 'text' })
  objetMission: string;  

  @Column({ type: 'text' })
  justificationDemande: string;  

  @Column({ type: 'text' })
  listeInvites: string;  

  @Column({ type: 'text' })
  justification: string;  

  @Column()
  filialePriseEnCharge: string;  
}
