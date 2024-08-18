import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: ['lib/**/**/*.entity.{ts,js}'],
      logging: process.env.NODE_ENV === 'development',
      synchronize: process.env.NODE_ENV === 'development',
    };
  }
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  logging: process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  synchronize: process.env.NODE_ENV === 'development',
};

const appDataSource = new DataSource(dataSourceOptions);

appDataSource
  .initialize()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Database connection failed.', err);
  });

export default appDataSource;
