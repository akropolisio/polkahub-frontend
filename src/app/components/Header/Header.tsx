import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { Back, InfoIcon } from 'components/icons';
import { Grid, IconButton, Typography, Tooltip } from 'components';
import { Auth } from 'features/auth';

import { routes } from '../../routes';
import { useStyles } from './Header.style';

interface IOwnProps {
  backRoutePath?: string;
  title: React.ReactNode;
}

type IProps = IOwnProps & RouteComponentProps;

function HeaderComponent(props: IProps) {
  const { title, backRoutePath, history } = props;
  const classes = useStyles();

  const handleLogout = React.useCallback(() => {
    history.push(routes.projects.getRedirectPath());
  }, [history]);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={3}>
        {backRoutePath && (
          <Grid item>
            <IconButton component={Link} to={backRoutePath} className={classes.backButton}>
              <Back />
            </IconButton>
          </Grid>
        )}

        <Grid item xs zeroMinWidth>
          <Typography variant="h4" noWrap className={classes.title}>
            {title}{' '}
            <Tooltip title="Platform as a Service for Substrate Nodes" placement="right">
              <span>
                <InfoIcon className={classes.infoIcon} />
              </span>
            </Tooltip>
          </Typography>
        </Grid>

        <Grid item>
          <Auth onLogout={handleLogout} />
        </Grid>
      </Grid>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
