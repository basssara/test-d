import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictsEntity } from 'entities/district.entity';
import { FacilityEntity, RegionEntity } from 'entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([DistrictsEntity, FacilityEntity, RegionEntity])
  ],
  controllers: [DistrictController],
  providers: [DistrictService]
})
export class DistrictModule { }
