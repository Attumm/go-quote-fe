export type GenericApiResponse<T> = T & {
  pagination?: Pagination;
};

export interface Quote {
  text: string;
  author: string;
  tags: string[];
  id: number;
  author_id: string;
}

export type ResponseQuote = Quote;

export interface ApiResponse {
  quotes: ResponseQuote[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  pages: number;
  next: string | null;
}

export interface PaginatedQuotes {
  quotes: ResponseQuote[];
  pagination: Pagination;
}

export interface AuthorResponse {
  name: string;
  author_id: string;
  total_quotes: number;
}

export interface PaginatedAuthors {
  authors: AuthorResponse[];
  pagination: Pagination;
}

export interface TagResponse {
  name: string;
  tag_id: string;
  total_quotes: number;
}

export interface PaginatedTags {
  tags: TagResponse[];
  pagination: Pagination;
}

export interface AuthorQuotes {
  author: string;
  author_id: string;
  total_quotes: number;
  quotes: ResponseQuote[];
  pagination: Pagination;
}
