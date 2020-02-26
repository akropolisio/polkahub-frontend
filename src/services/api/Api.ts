/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { autobind } from 'core-decorators';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import R from 'ramda';
import defaultAxios, { AxiosResponse } from 'axios';

import { Storage, localStorageAdapter } from 'services/storage';
import { memoize } from 'utils/decorators';
import { Node, PaginationOptions, Paginated, User } from 'model';
import { POLKAHUB_URL, LONG_POOLING_DELAY } from 'env';

import { BackendNode, ApiStorageStates, Response, SuccessfulResponse } from './types';
import { convertNode } from './converters';

const axios = defaultAxios.create({
  baseURL: POLKAHUB_URL,
});

export class Api {
  private storage = new Storage<ApiStorageStates>('api', localStorageAdapter, { user: null }, []);

  public user = new BehaviorSubject<User | null>(this.storage.getItem('user'));

  constructor() {
    this.user.subscribe(user => {
      this.storage.setItem('user', user);
      axios.defaults.headers.common.Authorization = user ? `Bearer ${user.token}` : undefined;
    });
  }

  // AUTH

  @autobind
  public async signUp(body: { email: string; password: string }): Promise<void> {
    const response = await axios.post<Response<void>>('signup', body);
    checkResponse(response);
  }

  @autobind
  public async login(body: { email: string; password: string }): Promise<void> {
    const response = await axios.post<Response<{ token: string }>>('login', body);

    checkResponse(response);

    this.user.next({ email: body.email, token: response.data.payload.token });
  }

  @autobind
  public async logout(): Promise<void> {
    this.user.next(null);
  }

  // PROJECTS

  @memoize((...args: any[]) => R.toString(args))
  @autobind
  public getAllProjects(
    body: { filter?: string },
    pagination: PaginationOptions,
  ): Observable<Paginated<Node>> {
    return timer(0, LONG_POOLING_DELAY).pipe(
      switchMap(() => this._getAllProjects(body, pagination)),
    );
  }

  @autobind
  private async _getAllProjects(
    body: { filter?: string },
    pagination: PaginationOptions,
  ): Promise<Paginated<Node>> {
    const response = await axios.get<Response<Paginated<BackendNode>>>('extended_search', {
      params: {
        ...(body.filter ? { name: body.filter } : {}),
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });

    checkResponse(response);

    const { payload } = response.data;

    return { total: payload.total, records: payload.records.map(convertNode) };
  }

  @memoize()
  @autobind
  public getUserProjects(): Observable<Node[]> {
    return this.user.pipe(
      switchMap(user => (user ? this._getUserProjects() : Promise.resolve<Node[]>([]))),
    );
  }

  @autobind
  private async _getUserProjects(): Promise<Node[]> {
    const response = await axios.get<Response<BackendNode[]>>('user_projects');
    checkResponse(response);

    return response.data.payload.map(convertNode);
  }
}

function checkResponse<T>(
  response: AxiosResponse<Response<T>>,
): asserts response is AxiosResponse<SuccessfulResponse<T>> {
  if (response.data.status === 'error') {
    throw new Error(response.data.reason);
  }
}
