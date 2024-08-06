import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { ServiceEntity } from './services.entity';
import { UserModel } from '@interfaces';
import { AccessRoles } from 'enums/roles.enum';

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pinpp: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  serialNumber: string;

  @Column({
    type: 'enum',
    enum: AccessRoles,
    default: AccessRoles.OPERATOR,
  })
  accessRoles: AccessRoles[];

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];

  @OneToMany(() => ServiceEntity, (service) => service.user)
  services: ServiceEntity[];

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
