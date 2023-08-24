import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { QueryFailedExceptionFilter } from '@Common/filters';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.setGlobalPrefix('api/');

  const config = new DocumentBuilder()
    .setTitle('TODO App')
    .setDescription('The TODO API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port || 3000);
}
bootstrap();
