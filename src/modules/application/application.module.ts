import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity, RegionEntity, ServiceEntity } from 'entities';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, ServiceEntity, RegionEntity])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule { }
