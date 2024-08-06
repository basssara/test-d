import { NestFactory } from '@nestjs/core';
import { App } from './app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { appConfig } from 'config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(App);

  app.use(
    json({
      limit: '5mb',
    }),
  );

  app.set('env', appConfig.env);
  app.set('etag', 'strong');
  app.set('trust proxy', true);
  app.set('x-powered-by', false);

  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
