import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class NumericIdDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
