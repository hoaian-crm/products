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
import { Response, Product } from 'crm-prototypes';

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

  @GrpcMethod('IProductController', 'GetById')
  async findOneWithGrpc(
    @Body() dto: { id: number[] },
  ): Promise<Product.IProductResponse> {
    const data = await this.productService.findMany(dto.id);
    return {
      products: data,
    };
  }

  @Put(':alias')
  async updateProduct(
    @Param('alias') alias: string,
    @Body() dto: UpdateProductDto,
  ) {
    const data = await this.productService.update(alias, dto);
    return Response.updateSuccess(data);
  }

  @GrpcMethod('IProductController', 'UpdateTotalWhenBuild')
  async buyProduct(@Body() dto: { alias: string; amount: number }) {
    const product = await this.productService.buyProduct(dto.alias, dto.amount);
    console.log('product ', product);
    return product;
  }

  @Delete()
  async deleteProducts(@Body() dto: { ids: number[] }) {
    const data = await this.productService.deleteProducts(dto);
    return Response.deleteSuccess(data);
  }
}
