import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
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
