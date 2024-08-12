import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { ServiceModel } from '@interfaces';
import { ApplicationEntity } from './application.entity';

@Entity('services')
export class ServiceEntity implements Omit<ServiceModel, 'userId'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  serviceName: string;

  @ManyToOne(() => UserEntity, (user) => user.services)
  user: UserEntity;

  @OneToMany(() => ApplicationEntity, (app) => app.service)
  applications: ApplicationEntity[];

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
