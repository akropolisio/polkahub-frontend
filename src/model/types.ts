export interface Node {
  createdAt: number;
  description: string | null;
  httpUrl: string;
  login: string;
  name: string;
  repoUrl?: string;
  updatedAt: number;
  version: string;
  wsUrl: string;
}

export interface PaginationOptions {
  offset: number;
  limit: number;
}

export interface Paginated<T> {
  records: T[];
  total: number;
}
