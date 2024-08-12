import { DistrictsModel } from '@interfaces';
import { RegionEntity } from './regions.entity';
import { FacilityEntity } from './facilities.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('districts')
export class DistrictEntity
  implements Omit<DistrictsModel, 'facilityId' | 'regionId'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  districtName: string;

  @OneToOne(() => FacilityEntity)
  @JoinColumn({
    name: 'facilityId',
  })
  facility: FacilityEntity;

  @ManyToOne(() => RegionEntity, (region) => region.districts)
  region: RegionEntity;

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
