import * as React from 'react';

import { Grid, Typography } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { LogoutButton } from '../LogoutButton/LogoutButton';
import { SignInButton } from '../SignInButton/SignInButton';
import { SignUpButton } from '../SignUpButton/SignUpButton';

interface Props {
  onLogout?(): void;
}

export function Auth({ onLogout }: Props) {
  const api = useApi();
  const [user] = useSubscribable(() => api.user, []);

  return user ? (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography>{user.email}</Typography>
      </Grid>
      <Grid item>
        <LogoutButton onSuccessful={onLogout} color="secondary" variant="outlined" />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <SignInButton />
      </Grid>
      <Grid item>
        <SignUpButton />
      </Grid>
    </Grid>
  );
}
