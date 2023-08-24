import { Expose } from 'class-transformer';

export class UserDoc {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;
}
