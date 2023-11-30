import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tag } from 'src/module/tags/tags.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  alias: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  tags: Tag[];
}
