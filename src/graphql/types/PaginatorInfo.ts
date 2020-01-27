export interface PaginatorInfo {
  count: number;
  currentPage: number;
  firstItem: number;
  hasMorePages: boolean;
  lastItem: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface Paginator<T> {
  paginatorInfo: PaginatorInfo;
  data: T[];
}
