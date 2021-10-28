import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ unique: true })
  admin_name: string;

  @Column()
  admin_password: string;
}