import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApplicationModel } from '@interfaces';
import { ServiceEntity } from './services.entity';

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

  // @Column({
  //   type: 'int',
  // })
  // applicationId: number;

  @Column()
  pinfl: string;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => ServiceEntity, (service) => service.applications)
  service: ServiceEntity;

  @Column({
    type: 'enum',
    enum: Statuses,
    default: Statuses.PENDING,
  })
  applicationStatus: Statuses;

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
