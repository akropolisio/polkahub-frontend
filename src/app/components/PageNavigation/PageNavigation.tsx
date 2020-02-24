import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { Tabs, Tab } from 'components';

import { useStyles } from './PageNavigation.style';

function PageNavigation() {
  const classes = useStyles();

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
            label="All nodes"
            component={Link}
            value={routes.nodes.getElementKey()}
            to={routes.nodes.getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="My nodes"
            component={Link}
            value={routes['my-nodes'].getElementKey()}
            to={routes['my-nodes'].getRedirectPath()}
          />
        </Tabs>
      )}
    </Route>
  );
}

export { PageNavigation };
