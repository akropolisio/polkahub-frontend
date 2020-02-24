import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'app/App';
import { Api, ApiContext } from 'services/api';
import { I18nProvider } from 'services/i18n';
import { ErrorBoundary, CssBaseline } from 'components';
import { theme } from 'utils/styles';

export function Root(): React.ReactElement<{}> {
  const api = new Api();

  if (process.env.NODE_ENV === 'development') {
    (window as any).api = api;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ApiContext.Provider value={api}>
          <I18nProvider>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </MuiThemeProvider>
          </I18nProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
