import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { DemoPage } from './pages/Demo/DemoPage';
import { AllNodesPage, MyNodesPage } from './pages/Nodes/NodesPage';
import { routes } from './routes';
import { BaseLayout } from './components/BaseLayout/BaseLayout';

const tKeys = tKeysAll.app;

export function App() {
  const { t } = useTranslate();

  return (
    <BaseLayout title={t(tKeys.mainTitle.getKey())}>
      <Switch>
        {process.env.NODE_ENV !== 'production' && (
          <Route exact path={routes.demo.getRoutePath()} component={DemoPage} />
        )}
        <Route exact path={routes.nodes.getRoutePath()} component={AllNodesPage} />
        <Route exact path={routes['my-nodes'].getRoutePath()} component={MyNodesPage} />
        <Redirect to={routes.nodes.getRedirectPath()} />
      </Switch>
    </BaseLayout>
  );
}
