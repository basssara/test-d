import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FacilityEntity } from './facilities.entity';
import { RegionModel } from '@interfaces';

@Entity('regions')
export class RegionEntity implements Omit<RegionModel, 'userId'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  regionName: string;

  @OneToOne(() => FacilityEntity)
  @JoinColumn({ name: 'facilityId' })
  facilityId: FacilityEntity;

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
