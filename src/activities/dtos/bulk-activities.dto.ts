import { ArrayUnique, IsArray, IsInt, IsPositive } from 'class-validator';

export class BulkActivitiesDto {
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  activityIds: number[];
}
