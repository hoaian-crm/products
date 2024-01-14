import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, isBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  inStock: boolean = true;

  @IsNumber()
  @Type(() => Number)
  stock: number = 0;

  @IsString()
  alias: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  image: string;
}
