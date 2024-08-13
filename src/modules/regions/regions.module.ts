import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from 'entities';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule { }
