import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  findBy: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  remove: jest.fn(),
  softDelete: jest.fn(),
  softRemove: jest.fn(),
  delete: jest.fn(),
  preload: jest.fn(),
});
