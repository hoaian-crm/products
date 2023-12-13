import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class IncrementDto {
  @IsString()
  alias: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  amount: number;
}
