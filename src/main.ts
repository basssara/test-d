import { NestFactory } from '@nestjs/core';
import { App } from './app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { appConfig, swaggerConfig } from 'config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(App, {
    cors: {
      maxAge: 0,
      methods: ['*'],
      credentials: false,
      allowedHeaders: ['*'],
      exposedHeaders: [],
      preflightContinue: false,
      optionsSuccessStatus: 200,
    },
  });

  app.use(
    json({
      limit: '5mb',
    }),
  );

  app.useGlobalPipes(new ValidationPipe()),
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'api/v',
    });

  app.set('env', appConfig.env);
  app.set('etag', 'strong');
  app.set('trust proxy', true);
  app.set('x-powered-by', false);

  const document = SwaggerModule.createDocument(app, swaggerConfig.options);

  SwaggerModule.setup(swaggerConfig.path, app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
