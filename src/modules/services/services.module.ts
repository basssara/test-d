import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'entities';
import { AsbtModule } from 'clients';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity]), AsbtModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
