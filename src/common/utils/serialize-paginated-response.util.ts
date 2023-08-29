import { PaginatedResponse } from '@Common/types';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export const serializePaginatedResponse = <T>(
  classType: ClassConstructor<T>,
  dataAndCount: [any[], number],
  excludeExtraneousValues = true,
): PaginatedResponse<T> => {
  const [data, totalCount] = dataAndCount;
  const typedData = plainToInstance(classType, data, {
    excludeExtraneousValues,
  });
  return {
    data: typedData,
    count: data?.length,
    totalCount,
  };
};
