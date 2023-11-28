import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DataSource, Repository } from 'typeorm';
import { FindProductDto } from './dto/find.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async findAndCount(query: FindProductDto) {
    return await this.productRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
    });
  }

  async create(body: CreateProductDto) {
    return body;
    // return await this.productRepository.findAndCount({
    //   take: query.limit,
    //   skip: query.offset,
    // });
  }
}
