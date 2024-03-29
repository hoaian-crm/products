import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './module/product/product.module';
import { StatisticModule } from './module/statistic/statistic.module';
import { LoggerModule } from '@relationc/logger';
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
      logging: process.env.NODE_ENV === 'local',
    }),
    ProductModule,
    StatisticModule,
    LoggerModule
  ],
})
export class AppModule { }
