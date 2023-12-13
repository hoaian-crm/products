import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Response } from 'crm-prototypes';
import { incrementDto } from './dto/whenOrder.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const data = await this.productService.create(dto);
    return Response.createSuccess(data);
  }

  @Get()
  async findAndCount(@Query() query: FindProductDto) {
    const [result, count] = await this.productService.findAndCount(query);
    return Response.findSuccess([result, count]);
  }

  @Get(':alias')
  async findOne(@Param('alias') alias: string) {
    const data = await this.productService.findOne(alias);
    return data;
  }

  @GrpcMethod('IProductController', 'findManyByIds')
  async findOneWithGrpc(@Body() dto: { ids: number[] }) {
    const data = await this.productService.findMany(dto.ids);
    return { products: data };
  }

  @Put(':alias')
  async updateProduct(
    @Param('alias') alias: string,
    @Body() dto: UpdateProductDto,
  ) {
    const data = await this.productService.update(alias, dto);
    return Response.updateSuccess(data);
  }

  @GrpcMethod('IProductController', 'incrementProduct')
  async incrementProduct(@Body() dto: incrementDto) {
    const product = await this.productService.increment(dto.alias, dto.amount);
    return product;
  }

  @Delete()
  async deleteProducts(@Body() dto: { ids: number[] }) {
    const data = await this.productService.deleteProducts(dto);
    return Response.deleteSuccess(data);
  }
}
