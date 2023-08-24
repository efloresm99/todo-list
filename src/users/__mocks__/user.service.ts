import { getUserDocStub } from '@Users/test/stubs';

export const UsersServiceMock = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(getUserDocStub()),
});
