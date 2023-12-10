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
      order: {
        createdAt: 'DESC',
      },
      where: {
        disable: false,
      },
      take: query.limit,
      skip: query.offset,
    });
  }

  async findOne(alias: string) {
    return await this.productRepository.findOne({
      where: {
        alias: alias,
        disable: false,
      },
      relations: ['tags'],
    });
  }

  async findMany(id: number[]) {
    return await this.productRepository.find({
      where: {
        id: In(id),
      },
    });
  }

  async create(dto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tags = await this.tagsService.findByIds(dto.tags);
      const newProduct = this.productRepository.create({
        ...dto,
        disable: false,
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

  async update(alias: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        alias: alias,
        disable: false,
      },
      relations: ['tags'],
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    product.disable = true;
    const newProduct: Product = {
      ...product,
      disable: false,
      name: dto.name ?? product.name,
      alias: dto.alias ?? product.alias,
      price: dto.price ?? product.price,
      description: dto.description ?? product.description,
      tags: dto.tags ?? product.tags,
    };

    try {
      const tags = await this.tagsService.findByIds(newProduct.tags);
      await queryRunner.manager.save(product);

      delete newProduct.id;
      const newPro = this.productRepository.create({
        ...newProduct,
        tags,
      });

      await queryRunner.manager.save(newPro);
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error when update', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async buyProduct(alias: string, amount: number) {
    const product = await this.productRepository.findOne({
      where: {
        alias: alias,
        disable: false,
      },
    });

    product.total_sold = product.total_sold + amount;

    const newProduct = await this.productRepository.save(product);

    return newProduct;
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
