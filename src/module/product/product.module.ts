import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ResourceTagModule } from '@hoaian-crm/tags';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ResourceTagModule.register(Product)],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule { }
