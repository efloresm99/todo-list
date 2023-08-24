import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDoc {
  @ApiProperty({
    type: String,
    description: 'The first name of the user created',
    example: 'Jane',
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the user created',
    example: 'Doe',
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user created',
    example: 'jdoe@example.com',
  })
  @Expose()
  email: string;
}
