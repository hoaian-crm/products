import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ResourceTagModule } from '@relationc/tags';
import { MinioModule } from '@relationc/minio-client';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ResourceTagModule.register(Product), MinioModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule { }
