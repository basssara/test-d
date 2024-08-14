import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UsersModule,
  RegionsModule,
  FacilitiesModule,
  ServicesModule,
} from '@modules';
import { HealthController } from 'health.controller';
import { ConfigModule } from '@nestjs/config';
import { asbtConfig, TypeOrmConfigService } from 'config';
import { ApplicationModule } from 'modules/application/application.module';
import { AuthModule } from 'auth/auth.module';
import { AsbtModule } from 'clients';
import { DistrictModule } from 'modules/district/district.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [asbtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    RegionsModule,
    ServicesModule,
    ApplicationModule,
    FacilitiesModule,
    AuthModule,
    AsbtModule,
    DistrictModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class App {}
