import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configs = app.get(ConfigService);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swagger_config = new DocumentBuilder()
    .setTitle('Cool Books')
    .setDescription('The cool books API description')
    .setVersion('1.0')
    .addTag('books')
    .addBearerAuth(
      {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('/', app, document);
  const port = configs.get("PORT") || 3021;
  await app.listen(port).then(() => {
    console.log('main application is listening');
  });
}
bootstrap();
