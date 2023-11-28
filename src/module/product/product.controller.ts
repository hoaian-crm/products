import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() query: FindProductDto) {
    const [result, count] = await this.productService.findAndCount(query);
    return {
      messages: [],
      data: {
        result,
        total: count,
        ...query,
      },
    };
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    const data = await this.productService.create(body);
    return data;
  }
}
