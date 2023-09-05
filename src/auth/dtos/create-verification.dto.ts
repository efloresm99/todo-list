import { CreateUserDto } from '@Users/dto';
import { PickType } from '@nestjs/swagger';

export class CreateVerificationDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
