import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './module/product/product.module';
import { StatisticModule } from './module/statistic/statistic.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: +process.env.PG_PORT,
      autoLoadEntities: true,
      // logging: ['warn'],
      logging: process.env.NODE_ENV === 'development',
    }),
    ProductModule,
    StatisticModule,
  ],
})
export class AppModule { }
