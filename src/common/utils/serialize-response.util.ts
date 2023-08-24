import { ClassConstructor, plainToInstance } from 'class-transformer';

export const serializeResponse = <T>(
  classType: ClassConstructor<T>,
  data: unknown,
  excludeExtraneousValues = true,
): T => plainToInstance(classType, data, { excludeExtraneousValues });
