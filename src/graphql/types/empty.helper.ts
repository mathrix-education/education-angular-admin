import {Paginator} from './PaginatorInfo';

export const emptyPaginator: Paginator<any> = {
  paginatorInfo: {
    count: 0,
    currentPage: 0,
    firstItem: 0,
    hasMorePages: false,
    lastItem: 0,
    lastPage: 0,
    perPage: 0,
    total: 0
  },
  data: []
};
