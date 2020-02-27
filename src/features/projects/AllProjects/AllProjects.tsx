import * as React from 'react';

import { useApi } from 'services/api';
import { useApiPagination } from 'utils/react';
import { PaginationOptions } from 'model';
import { Loading, Hint, NodeCard, Grid } from 'components';

export function AllProjects() {
  const api = useApi();
  const { items, meta, paginationView } = useApiPagination(
    (pagination: PaginationOptions) => api.getAllProjects({}, pagination),
    [],
  );

  return (
    <Loading meta={meta} errorComponent={Hint}>
      {items.length ? (
        <Grid container spacing={2}>
          {items.map(({ login, ...node }, index) => (
            <Grid item xs={12} key={index}>
              <NodeCard {...node} owner={login} />
            </Grid>
          ))}
          <Grid item xs={12}>
            {paginationView}
          </Grid>
        </Grid>
      ) : (
        <Hint>Projects is not found</Hint>
      )}
    </Loading>
  );
}
