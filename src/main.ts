import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module';
import { EnvService } from './shared/env/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get(EnvService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("CowCow-API")
    .setDescription("Especificações da API para o back-end da aplicação CowCow")
    .setVersion("1.0.0")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  if (configService.get("NODE_ENV") !== "development") {
    app.setGlobalPrefix('api/v1');
  };

  await app.listen(configService.get("PORT"), "0.0.0.0");
}

bootstrap();
