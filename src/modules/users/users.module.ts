import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityEntity, UserEntity } from 'entities';
import { AsbtModule } from 'clients';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FacilityEntity]), AsbtModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
