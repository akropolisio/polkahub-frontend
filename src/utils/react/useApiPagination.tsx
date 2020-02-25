import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Observable } from 'rxjs';

import { Pagination } from 'components/Pagination/Pagination';
import { Paginated } from 'model';

import { useOnChangeState } from './useOnChangeState';
import { useSubscribable } from './useSubscribable';

const notEquals = R.pipe(R.equals, R.not);

const steps = [10, 25, 50, 100];

interface Pagination {
  limit: number;
  offset: number;
}

export function useApiPagination<T>(
  getItems: (pagination: Pagination) => Observable<Paginated<T>>,
  deps: any[],
) {
  const [currentPage, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const from = currentPage * perPage;
  const [result, resultMeta] = useSubscribable(() => getItems({ limit: perPage, offset: from }), [
    ...deps,
    perPage,
    from,
  ]);

  const changePerPage = useCallback(
    itemPerPage => {
      setPage(Math.floor(from / itemPerPage));
      setPerPage(itemPerPage);
    },
    [from],
  );

  const total = result?.total || null;

  useOnChangeState(total, notEquals, () => {
    if (typeof total !== 'number') {
      return;
    }

    const maxPageNumber = Math.floor(total / perPage);
    if (maxPageNumber < currentPage) {
      setPage(maxPageNumber);
    }
  });

  const paginationView = (
    <Pagination
      totalItems={total || 0}
      perPage={perPage}
      currentPage={currentPage}
      onChangePerPage={changePerPage}
      onChangePage={setPage}
      paginationSteps={steps}
    />
  );

  return { items: result?.records || [], paginationView, meta: resultMeta };
}
