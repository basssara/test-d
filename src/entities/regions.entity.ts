import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => RegionEntity, (region) => region.children)
  parentCategory: RegionEntity;

  @OneToMany(() => RegionEntity, (region) => region.parentCategory)
  children: RegionEntity[];

  @OneToOne(() => FacilityEntity)
  @JoinColumn({ name: 'facilityId' })
  user: FacilityEntity;

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
