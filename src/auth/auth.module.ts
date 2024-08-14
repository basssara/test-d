import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '@modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityEntity, UserEntity } from 'entities';
import { AsbtModule } from 'clients';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FacilityEntity]), AsbtModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
