import { BadRequestException, Injectable } from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, In, DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private tagsService: TagsService,
    private dataSource: DataSource,
  ) {}

  async findAndCount(query: FindProductDto) {
    return await this.productRepository.findAndCount({
      relations: ['tags'],
      take: query.limit,
      skip: query.offset,
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findBy({
      id: id,
    });
  }

  async create(dto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tags = await this.tagsService.findByIds(dto.tags);
      await queryRunner.manager.save(tags);
      const newProduct = this.productRepository.create({
        ...dto,
        tags,
      });

      await queryRunner.manager.save(newProduct);
      await queryRunner.commitTransaction();

      return newProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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

  async sortTotalSold() {
    return await this.productRepository.find({ order: { total_sold: 'DESC' } });
  }
}
