import { Priorities } from '@Common/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  description?: string;

  @IsString()
  @IsEnum(Priorities)
  priority: Priorities;
}
