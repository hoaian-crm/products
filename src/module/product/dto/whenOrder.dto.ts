import { IsNumber, IsString, Min } from 'class-validator';

export class IncrementDto {
  @IsString()
  alias: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
