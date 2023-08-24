import { Test, TestingModule } from '@nestjs/testing';

import { getCreateUserDtoStub, getUserDocStub } from './stubs';
import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { UsersServiceMock } from '../__mocks__/';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should return user doc', async () => {
      const createUserDto = getCreateUserDtoStub();
      const userDoc = getUserDocStub();
      const result = await controller.createUser(createUserDto);
      expect(result).toEqual(userDoc);
    });
  });
});
