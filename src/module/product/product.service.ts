import { BadRequestException, Injectable } from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, In } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAndCount(query: FindProductDto) {
    return await this.productRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
    });
  }

  async create(dto: CreateProductDto) {
    const checkExitsProduct = await this.productRepository.findOneBy({
      alias: dto.alias,
    });
    if (!checkExitsProduct) {
      const newProduct = this.productRepository.create(dto);
      return this.productRepository.save(newProduct);
    }
    throw new BadRequestException('Alias doesnt exist');
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new BadRequestException('something went wrong');
    }
    product.name = dto.name ?? product.name;
    product.alias = dto.alias ?? product.alias;
    product.price = dto.price ?? product.price;
    product.description = dto.description ?? product.description;

    return this.productRepository.save(product);
  }

  async deleteProducts(dto: { ids: number[] }) {
    const products = await this.productRepository.findBy({
      id: In(dto.ids),
    });

    if (products.length === dto.ids.length) {
      const pro = await this.productRepository.delete({
        id: In(dto.ids),
      });
      return pro['affected'];
    }

    throw new BadRequestException('something went wrong');
  }
}
