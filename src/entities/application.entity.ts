import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';
import { ApplicationModel } from '@interfaces';

export enum Statuses {
  ACCEPTED = 'accepted',
  PAYMENT_ACCEPTED = 'payment',
  PROCEEDING = 'proceeding',
  PERSONALTIZATION_SENT = 'personalization_sent',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity('applications')
export class ApplicationEntity implements Pick<ApplicationModel, 'pinfl'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
  })
  applicationId: number;

  @Column()
  pinfl: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({
    type: 'enum',
    enum: Statuses,
    default: Statuses.PENDING,
  })
  applicationStatus: Statuses;

  @ManyToOne(() => UserEntity, (user) => user.applications)
  user: UserEntity;

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
