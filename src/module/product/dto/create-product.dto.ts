import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, isBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  inStock: boolean = true;

  @IsNumber()
  @Type(() => Number)
  stock: number = 0;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  image: string;
}
