import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from './prototypes/gen/ts/interfaces/product';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.PRODUCT_GRPC || 'localhost:50051',
      package: protobufPackage,
      protoPath: ['src/prototypes/interfaces/product.proto'],
      loader: {
        longs: Number,
      },
    },
  });

  app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.APP_PORT || 3001);
}
bootstrap();
