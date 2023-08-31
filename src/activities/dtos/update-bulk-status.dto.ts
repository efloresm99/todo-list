import { IsBoolean } from 'class-validator';

import { BulkActivitiesDto } from './bulk-activities.dto';

export class UpdateBulkStatusDto extends BulkActivitiesDto {
  @IsBoolean()
  completed: boolean;
}
