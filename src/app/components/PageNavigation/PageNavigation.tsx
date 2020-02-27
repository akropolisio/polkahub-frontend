import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { Tabs, Tab } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

import { useStyles } from './PageNavigation.style';

function PageNavigation() {
  const classes = useStyles();
  const api = useApi();
  const [user] = useSubscribable(() => api.user, []);

  return (
    <Route path="/:page">
      {({ match }: RouteComponentProps<{ page: string }>) => (
        <Tabs
          value={match && match.params.page}
          indicatorColor="primary"
          textColor="primary"
          classes={{ flexContainer: classes.tabsFlexContainer }}
        >
          <Tab
            className={classes.tab}
            label="All projects"
            component={Link}
            value={routes.projects.getElementKey()}
            to={routes.projects.getRedirectPath()}
          />
          {user && (
            <Tab
              className={classes.tab}
              label="My projects"
              component={Link}
              value={routes['my-projects'].getElementKey()}
              to={routes['my-projects'].getRedirectPath()}
            />
          )}
          {user && (
            <Tab
              className={classes.tab}
              label="My applications"
              component={Link}
              value={routes['my-applications'].getElementKey()}
              to={routes['my-applications'].getRedirectPath()}
            />
          )}
        </Tabs>
      )}
    </Route>
  );
}

export { PageNavigation };
