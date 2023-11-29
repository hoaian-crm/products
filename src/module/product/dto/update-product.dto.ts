import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
