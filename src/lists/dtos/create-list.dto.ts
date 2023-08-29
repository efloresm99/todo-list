import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  description?: string;
}
