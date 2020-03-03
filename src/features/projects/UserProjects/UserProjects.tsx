import * as React from 'react';

import { useApi } from 'services/api';
import { EditProjectButton } from 'features/editProject';
import { useSubscribable, usePagination } from 'utils/react';
import { Loading, Hint, NodeCard, Grid, Link } from 'components';
import { Node } from 'model';
import { POLKAHUB_CLI_REPO_URL } from 'env';

export function UserProjects() {
  const api = useApi();
  const [items, meta] = useSubscribable(() => api.getUserProjects(), [], []);
  const { items: paginatedItems, paginationView } = usePagination(items);

  return (
    <Loading meta={meta} errorComponent={Hint}>
      {paginatedItems.length ? (
        <Grid container spacing={2}>
          {paginatedItems.map((node, index) => (
            <Grid item xs={12} key={index}>
              <EditableNodeCard {...node} />
            </Grid>
          ))}
          <Grid item xs={12}>
            {paginationView}
          </Grid>
        </Grid>
      ) : (
        <Hint>
          Projects is not found. You can create project with&nbsp;
          <Link href={POLKAHUB_CLI_REPO_URL} target="_blank" rel="noopener noreferrer">
            polkahub-cli
          </Link>
          .
        </Hint>
      )}
    </Loading>
  );
}

const EditableNodeCard = React.memo(function EditableNodeCard({ login, ...node }: Node) {
  return (
    <NodeCard
      {...node}
      owner={login}
      actions={
        node.id ? (
          <EditProjectButton description={node.description} id={node.id} name={node.name} />
        ) : (
          undefined
        )
      }
    />
  );
});
