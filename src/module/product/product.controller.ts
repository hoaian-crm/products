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
import { Product, Response } from 'crm-prototypes';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('products')
export class ProductController implements Product.IProductController {
  constructor(private readonly productService: ProductService) {}

  async findOneByAlias(
    request: Product.AliasDto,
  ): Promise<Product.ResponseFindOne> {
    const data = await this.productService.findOneByAlias(request.alias);
    return {
      alias: data.alias,
      description: data.description,
      discount: data.discount,
      id: data.id,
      name: data.name,
      price: data.price,
      totalSold: data.total_sold,
    };
  }

  @GrpcMethod('IProductController', 'findManyByIds')
  async findManyByIds(
    request: Product.IdsDto,
  ): Promise<Product.ResponseFindMany> {
    const data = await this.productService.findManyByIds(request.ids);

    return {
      products: data.map((data) => ({
        alias: data.alias,
        description: data.description,
        discount: data.discount,
        id: data.id,
        name: data.name,
        price: data.price,
        totalSold: data.total_sold,
      })),
    };
  }

  async findManyByAlias(
    request: Product.ManyAliasDto,
  ): Promise<Product.ResponseFindMany> {
    console.log('request', request);
    return {
      products: [],
    };
  }

  async findOneById(request: Product.IdDto): Promise<Product.ResponseFindOne> {
    const data = await this.productService.findOneById(request.id);
    return {
      alias: data.alias,
      description: data.description,
      discount: data.discount,
      id: data.id,
      name: data.name,
      price: data.price,
      totalSold: data.total_sold,
    };
  }

  async descrementProduct(
    request: Product.dtoUpdateAmount,
  ): Promise<Product.ResponseFindOne> {
    const data = await this.productService.decrement(
      request.alias,
      request.amount,
    );
    return {
      alias: data.alias,
      description: data.description,
      discount: data.discount,
      id: data.id,
      name: data.name,
      price: data.price,
      totalSold: data.total_sold,
    };
  }

  @GrpcMethod('IProductController', 'incrementProduct')
  async incrementProduct(
    request: Product.dtoUpdateAmount,
  ): Promise<Product.ResponseFindOne> {
    if (request.amount < 0) throw new Error('Amount cannot be be less than 0');
    const data = await this.productService.increment(
      request.alias,
      request.amount,
    );
    return {
      alias: data.alias,
      description: data.description,
      discount: data.discount,
      id: data.id,
      name: data.name,
      price: data.price,
      totalSold: data.total_sold,
    };
  }
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
    const data = await this.productService.findOneByAlias(alias);
    return data;
  }

  @Put(':alias')
  async updateProduct(
    @Param('alias') alias: string,
    @Body() dto: UpdateProductDto,
  ) {
    const data = await this.productService.update(alias, dto);
    return Response.updateSuccess(data);
  }

  // @GrpcMethod('IProductController', 'incrementProduct')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async incrementProduct(@Body() dto: IncrementDto) {
  //   const product = await this.productService.increment(dto.alias, dto.amount);
  //
  //   console.log('product', product);
  //   return product;
  // }

  @Delete()
  async deleteProducts(@Body() dto: { ids: number[] }) {
    const data = await this.productService.deleteProducts(dto);
    return Response.deleteSuccess(data);
  }
}
