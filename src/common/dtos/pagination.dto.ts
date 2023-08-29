import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 0, { toClassOnly: true })
  @IsInt()
  @Min(0)
  offset: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 10, { toClassOnly: true })
  @IsInt()
  @Min(1)
  limit: number;
}
