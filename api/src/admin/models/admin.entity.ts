import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AdminRole } from './admin.interface';

@Entity()
export class AdminEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ unique: true })
  admin_name: string;

  @Column()
  admin_password: string;

  @Column({ type: 'enum', enum: AdminRole, default: AdminRole.USER })
  role: AdminRole;

  @BeforeInsert()
  nameToLowerCase() {
    this.admin_name = this.admin_name.toLowerCase();
  }
}
