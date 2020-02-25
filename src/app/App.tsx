import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { DemoPage } from './pages/Demo/DemoPage';
import { AllProjectsPage, MyApplicationsPage, MyProjectsPage } from './pages/Projects/ProjectsPage';
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
        <Route exact path={routes.projects.getRoutePath()} component={AllProjectsPage} />
        <Route exact path={routes['my-projects'].getRoutePath()} component={MyProjectsPage} />
        <Route
          exact
          path={routes['my-applications'].getRoutePath()}
          component={MyApplicationsPage}
        />
        <Redirect to={routes.projects.getRedirectPath()} />
      </Switch>
    </BaseLayout>
  );
}
