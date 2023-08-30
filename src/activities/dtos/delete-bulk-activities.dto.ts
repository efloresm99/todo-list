import { ArrayUnique, IsArray, IsInt, IsPositive } from 'class-validator';

export class DeleteBulkActivitiesDto {
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  activityIds: number[];
}
