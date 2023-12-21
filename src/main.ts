import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'crm-prototypes/dist/gen/ts/interfaces/product';
import { AppModule } from './app.module';

const endpoint = '/api/v1';

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
  app.setGlobalPrefix(endpoint);
  microServices.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  await app.listen(process.env.APP_PORT || 3000);

  // const server = app.getHttpServer();
  //
  // const router = server._events.request._router;
  //
  // const availableRoutes: [] = router.stack
  //   .map((layer: any) => {
  //     if (layer.route) {
  //       return {
  //         upstream: 'products',
  //         path: layer.route?.path.replace(endpoint, ''),
  //         method: (layer.route?.stack[0].method as string).toUpperCase(),
  //       };
  //     }
  //   })
  //   .filter((item: any) => item !== undefined);
  //
  // console.log(availableRoutes);
}
bootstrap();
