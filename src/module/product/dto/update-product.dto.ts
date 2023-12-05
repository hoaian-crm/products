import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tag } from 'src/module/tags/tags.entity';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  alias: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  tags: Tag[];
}
