import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
