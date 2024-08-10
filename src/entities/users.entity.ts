import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { ServiceEntity } from './services.entity';
import { UserModel } from '@interfaces';

export enum RecordStatusesForDB {
  ACTIVE_NEW = 'active_new',
  CANCELL = 'cancell',
  EDIT = 'edit',
}

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  pinpp: string;

  @Column({
    type: 'enum',
    enum: RecordStatusesForDB,
    default: RecordStatusesForDB.ACTIVE_NEW,
  })
  status: RecordStatusesForDB;

  @Column({ type: 'varchar' })
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({
    type: 'varchar',
    array: true,
  })
  accessRoles: string[];

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];

  @OneToMany(() => ServiceEntity, (service) => service.user)
  services: ServiceEntity[];

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dateTill: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
