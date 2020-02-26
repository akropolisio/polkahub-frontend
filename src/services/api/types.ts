import { User } from 'model';

export interface BackendNode {
  created_at: number;
  description: string | null;
  http_url: string;
  login: string;
  name: string;
  repo_url?: string;
  updated_at: number;
  version: string;
  ws_url: string;
}

export type SuccessfulResponse<T> = {
  status: 'ok';
  payload: T;
};

export type Response<T> =
  | SuccessfulResponse<T>
  | {
      status: 'error';
      reason: string;
    };

interface ApiStorageV1 {
  user: User | null;
}

export type ApiStorageStates = [ApiStorageV1];
