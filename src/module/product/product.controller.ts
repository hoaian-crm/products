import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from '@relationc/prototypes';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '@relationc/minio-client';
import { ApiMetaData, ControllerMetaData } from '@relationc/permissions';

@ControllerMetaData("products", "Product")
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService, private minioService: MinioService) { }

  @ApiMetaData({
    name: "Create product",
    description: "Allow create new product",
    policy: "product:create",
  })
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fileSize: 5000000 // 5MB
    }
  }))
  async create(@Body() dto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const name = `${new Date().getTime()}.${file.originalname.split('.').pop()}`;
      await this.minioService.uploadFile('crm', `images/products/${name}`, file.buffer);
      dto.image = name;
    }
    const data = await this.productService.create(dto);
    return Response.createSuccess(data);
  }

  @ApiMetaData({
    name: "Get products",
    description: "Allow get many product",
    policy: "product:get_all",
  })
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

  @ApiMetaData({
    name: "Delete product",
    description: "Allow delte product",
    policy: "product:delete"
  })
  @Delete()
  async deleteProducts(@Query() dto: { ids: number[] }) {
    const data = await this.productService.deleteProducts(dto);
    return Response.deleteSuccess(data);
  }
}
