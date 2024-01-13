import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configLogger } from '@relationc/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(await configLogger(app))
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
