export interface Results<T> {
  results: number;
  metadata: Metadata;
  data: T;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
