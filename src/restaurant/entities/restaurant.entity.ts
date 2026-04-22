import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  location!: string;

  @Column({ type: 'boolean', default: true })
  active!: boolean; 
}