import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class incrementDto {
  @IsString()
  alias: string;

  @IsNumber()
  @Transform(() => Number)
  @Min(1)
  amount: number;
}
