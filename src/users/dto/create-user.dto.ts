import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';
import { passwordRegexp } from '../regexp';

const passwordRules =
  'Password must contain one uppercase letter, one special char and one number';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 60)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(passwordRegexp, { message: passwordRules })
  password: string;
}
