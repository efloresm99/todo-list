import { UserDoc } from '@Users/docs';

export const getUserDocStub = (): UserDoc => {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jdoe@example.com',
  };
};
