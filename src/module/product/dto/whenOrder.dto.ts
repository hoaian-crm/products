import { IsNumber, IsString } from 'class-validator';

export class IncrementDto {
  @IsString()
  alias: string;

  @IsNumber()
  amount: number;
}
