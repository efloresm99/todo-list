import { CreateUserDto } from '@Users/dto';

export const getCreateUserDtoStub = (): CreateUserDto => {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'somePassword123*',
  };
};
