import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'crm-prototypes/dist/gen/ts/interfaces/product';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.PRODUCT_GRPC || 'localhost:50051',
      package: protobufPackage,
      protoPath: ['node_modules/crm-prototypes/interfaces/product.proto'],
      loader: {
        longs: Number,
      },
    },
  });
  const microServices = await app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('/api/v1');
  microServices.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
