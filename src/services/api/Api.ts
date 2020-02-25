/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { autobind } from 'core-decorators';
import { of, Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import R from 'ramda';
import { stringify } from 'querystring';

import { memoize } from 'utils/decorators';
import { Node, PaginationOptions, Paginated } from 'model';
import { POLKAHUB_URL, LONG_POOLING_DELAY } from 'env';

import { BackendNode } from './types';
import { convertNode } from './converters';

function getUrl(endpoint: string, params?: Record<string, string | number>) {
  const search = params && stringify(params);
  return `${POLKAHUB_URL}/${endpoint}${search ? `?${search}` : ''}`;
}

export class Api {
  private token = new BehaviorSubject<string | null>(null);

  // AUTH
  @autobind
  public async signUp(body: { email: string; password: string }): Promise<void> {
    await fetch(getUrl('signup'), {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  @autobind
  public async login(body: { email: string; password: string }): Promise<void> {
    const response = await fetch(getUrl('login'), {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const { token } = await response.json();
    this.token.next(token);
  }

  @autobind
  public async logout(): Promise<void> {
    this.token.next(null);
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
    const response = await fetch(
      getUrl('extended_search', {
        ...(body.filter ? { name: body.filter } : {}),
        offset: pagination.offset.toString(),
        limit: pagination.limit.toString(),
      }),
      {
        method: 'GET',
      },
    );

    const { payload }: { payload: Paginated<BackendNode> } = await response.json();

    return { total: payload.total, records: payload.records.map(convertNode) };
  }
}
