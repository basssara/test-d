import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { RegionEntity } from './regions.entity';
import { FacilitiesModel } from '@interfaces';
import { DistrictEntity } from './district.entity';

@Entity('facilities')
export class FacilityEntity
  implements Omit<FacilitiesModel, 'userId' | 'regionId'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  serviceName: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => DistrictEntity)
  @JoinColumn({ name: 'districtId' })
  district: DistrictEntity;

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
