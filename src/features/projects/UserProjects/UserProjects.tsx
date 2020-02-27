import * as React from 'react';

import { useApi } from 'services/api';
import { EditProjectButton } from 'features/editProject';
import { useSubscribable, usePagination } from 'utils/react';
import { Loading, Hint, NodeCard, Grid } from 'components';
import { Node } from 'model';

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
        <Hint>Applications is not found</Hint>
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
