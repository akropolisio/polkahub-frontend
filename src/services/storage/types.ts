import { Tuple } from 'ts-toolbelt';

export interface StorageAdapter {
  checkAvailability(): boolean;
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  getAllKeys(): string[];
}

type _TailAndStatesToMigrations<T, S extends any> = {
  [key in keyof T]: (state: S[key]) => T[key];
};

export type StatesToMigrations<S extends any[]> = _TailAndStatesToMigrations<Tuple.Tail<S>, S>;
