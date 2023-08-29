import { Expose } from 'class-transformer';

export class ListDoc {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  finished: boolean;

  @Expose()
  createdAt: Date;
}
