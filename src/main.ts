import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './shared/env/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("CowCow-API")
    .setDescription("Especificações da API para o back-end da aplicação CowCow")
    .setVersion("1.0.0")
    .setOpenAPIVersion("3.0.0")
    .addBearerAuth({ type: "http", scheme: "bearer" })
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  if (configService.get("NODE_ENV") !== "development") {
    app.setGlobalPrefix('api/v1');
  };

  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RolesGuard(app.get(Reflector))
  )

  await app.listen(configService.get("PORT"), "0.0.0.0");
}

bootstrap();
