import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockRepository, createMockRepository } from '@Common/mocks';
import { User } from '@Entities';

import { getCreateUserDtoStub, getUserStub } from './stubs';
import { UsersService } from '../services';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = getCreateUserDtoStub();
      const user = getUserStub();
      userRepository.create.mockResolvedValue(user);
      userRepository.save.mockResolvedValue(user);
      const result = await service.createUser(createUserDto);
      expect(result).toEqual(user);
    });
  });
});
