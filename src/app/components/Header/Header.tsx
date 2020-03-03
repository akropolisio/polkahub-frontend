import * as React from 'react';
import { withRouter, RouteComponentProps, Link as RouterLink } from 'react-router-dom';

import { Back, InfoIcon, GitHubIcon } from 'components/icons';
import { Grid, IconButton, Typography, Tooltip, Link } from 'components';
import { Auth } from 'features/auth';
import { POLKAHUB_MONOREPO_URL } from 'env';

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
      <div className={classes.content}>
        <Grid container alignItems="center" spacing={3}>
          {backRoutePath && (
            <Grid item>
              <IconButton component={RouterLink} to={backRoutePath} className={classes.backButton}>
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
      <Link
        className={classes.ghLink}
        href={POLKAHUB_MONOREPO_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon className={classes.ghLinkIcon} />
      </Link>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
