import { User } from '@Entities';

export const getUserStub = (): User => {
  return {
    id: '95391f7c-c68d-4e90-950b-019917e43e7b',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'hashedPassword',
    verified: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: null,
    lists: [],
    invalidTokens: [],
  };
};
