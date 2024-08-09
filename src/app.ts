import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UsersModule,
  RegionsModule,
  FacilitiesModule,
  ServicesModule,
} from '@modules';
import { HealthController } from 'health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { asbtConfig, TypeOrmConfig } from 'config';
import { ApplicationModule } from 'modules/application/application.module';
import { AuthModule } from 'auth/auth.module';
import { AsbtModule } from 'clients';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [TypeOrmConfig, asbtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RegionsModule,
    ServicesModule,
    ApplicationModule,
    FacilitiesModule,
    AuthModule,
    AsbtModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class App { }
