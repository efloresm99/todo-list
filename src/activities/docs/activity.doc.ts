import { Expose } from 'class-transformer';

import { Priorities } from '@Common/enums';

export class ActivityDoc {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  priority: Priorities;

  @Expose()
  completed: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
