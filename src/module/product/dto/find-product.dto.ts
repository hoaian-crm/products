import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindProductDto {
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;

  @IsNumber()
  @Type(() => Number)
  offset: number = 0;
}
