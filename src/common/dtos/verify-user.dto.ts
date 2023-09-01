import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @IsNotEmpty()
  verificationId: string;

  @IsString()
  @IsEmail()
  userEmail: string;
}
