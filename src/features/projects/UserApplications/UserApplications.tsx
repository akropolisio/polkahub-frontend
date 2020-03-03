import * as React from 'react';

import { useApi } from 'services/api';
import { useSubscribable, usePagination } from 'utils/react';
import { Loading, Hint, NodeCard, Grid, Link } from 'components';
import { POLKAHUB_CLI_REPO_URL } from 'env';

export function UserApplications() {
  const api = useApi();
  const [items, meta] = useSubscribable(() => api.getUserApplications(), [], []);
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
        <Hint>
          Applications is not found. You can create application with&nbsp;
          <Link href={POLKAHUB_CLI_REPO_URL} target="_blank" rel="noopener noreferrer">
            polkahub-cli
          </Link>
          .
        </Hint>
      )}
    </Loading>
  );
}
