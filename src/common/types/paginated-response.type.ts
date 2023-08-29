export type PaginatedResponse<T> = {
  data: T[];
  count: number;
  totalCount: number;
};
