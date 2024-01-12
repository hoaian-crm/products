import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from '@hoaian-crm/prototypes';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

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

  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    const data = await this.productService.update(id, dto);
    return Response.updateSuccess(data);
  }

  @Delete()
  async deleteProducts(@Body() dto: { ids: number[] }) {
    const data = await this.productService.deleteProducts(dto);
    return Response.deleteSuccess(data);
  }
}
