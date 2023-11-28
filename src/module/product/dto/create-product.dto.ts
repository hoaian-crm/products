import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  alias: string;

  @IsOptional()
  description: string;

  @Transform(() => Number)
  price: number;
}
