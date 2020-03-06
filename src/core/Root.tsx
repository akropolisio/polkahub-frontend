import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory, Location } from 'history';
import animateScroll from 'react-scroll/modules/mixins/animate-scroll';

import { App } from 'app/App';
import { Api, ApiContext } from 'services/api';
import { I18nProvider } from 'services/i18n';
import { ErrorBoundary, CssBaseline } from 'components';
import { theme } from 'utils/styles';

const browserHistory = createBrowserHistory();

browserHistory.listen(handleScrollToAnchor);

function handleScrollToAnchor(location: Location<any>) {
  setTimeout(() => {
    if (location.hash) {
      // scroll to anchor
      const element = document.getElementById(location.hash.slice(1));
      const offset = element && element.getBoundingClientRect().top;
      offset && animateScroll.scrollMore(offset);
    } else {
      animateScroll.scrollToTop();
    }
  }, 0);
}

export function Root(): React.ReactElement<{}> {
  const api = new Api();

  if (process.env.NODE_ENV === 'development') {
    (window as any).api = api;
  }

  useEffect(() => {
    handleScrollToAnchor(browserHistory.location);
  }, []);

  return (
    <ErrorBoundary>
      <Router history={browserHistory}>
        <ApiContext.Provider value={api}>
          <I18nProvider>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </MuiThemeProvider>
          </I18nProvider>
        </ApiContext.Provider>
      </Router>
    </ErrorBoundary>
  );
}
