import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { passwordRegexp } from '../regexp';

const passwordRules =
  'Password must contain one uppercase letter, one special char and one number';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The first name of the user to be created',
    example: 'Jane',
  })
  @IsString()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the user to be created',
    example: 'Doe',
  })
  @IsString()
  @Length(2, 60)
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user to be created',
    example: 'jdoe@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user to be created',
  })
  @IsString()
  @MinLength(8)
  @Matches(passwordRegexp, { message: passwordRules })
  password: string;
}
