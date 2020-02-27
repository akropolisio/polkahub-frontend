import * as React from 'react';

import { useApi } from 'services/api';
import { useSubscribable, usePagination } from 'utils/react';
import { Loading, Hint, NodeCard, Grid } from 'components';

export function UserProjects() {
  const api = useApi();
  const [items, meta] = useSubscribable(() => api.getUserProjects(), [], []);
  const { items: paginatedItems, paginationView } = usePagination(items);

  return (
    <Loading meta={meta} errorComponent={Hint}>
      {paginatedItems.length ? (
        <Grid container spacing={2}>
          {paginatedItems.map(({ login, ...node }, index) => (
            <Grid item xs={12} key={index}>
              <NodeCard {...node} owner={login} />
            </Grid>
          ))}
          <Grid item xs={12}>
            {paginationView}
          </Grid>
        </Grid>
      ) : (
        <Hint>Applications is not found</Hint>
      )}
    </Loading>
  );
}
