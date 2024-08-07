import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '@modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
