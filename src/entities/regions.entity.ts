import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegionModel } from '@interfaces';
import { DistrictEntity } from './district.entity';

@Entity('regions')
export class RegionEntity implements Omit<RegionModel, 'userId'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  regionName: string;

  @OneToMany(() => DistrictEntity, (district) => district.region)
  @JoinColumn({ name: 'facilityId' })
  districts: DistrictEntity[];

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
