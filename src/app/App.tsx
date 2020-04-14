import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { DemoPage } from './pages/Demo/DemoPage';
import { AboutPage } from './pages/About/AboutPage';
import { routes } from './routes';
import { BaseLayout } from './components/BaseLayout/BaseLayout';

const tKeys = tKeysAll.app;

export function App() {
  const { t } = useTranslate();

  return (
    <BaseLayout title={t(tKeys.mainTitle.getKey())} hidePageNavigation>
      <Switch>
        {process.env.NODE_ENV !== 'production' && (
          <Route exact path={routes.demo.getRoutePath()} component={DemoPage} />
        )}
        <Route exact path={routes.about.getRoutePath()} component={AboutPage} />
        <Redirect to={routes.about.getRedirectPath()} />
      </Switch>
    </BaseLayout>
  );
}
