import * as React from 'react';

import { ModalButton, Typography, Button, Grid } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { SignUpForm } from './SignUpForm';

const tKeys = tKeysAll.features.auth;

export function SignUpButton() {
  const { t } = useTranslate();
  const [displaySuccessfulMessage, setDisplaySuccessfulMessage] = React.useState(false);

  const displaySuccessful = React.useCallback(() => setDisplaySuccessfulMessage(true), []);
  const hideSuccessful = React.useCallback(() => setDisplaySuccessfulMessage(false), []);

  return (
    <ModalButton content={t(tKeys.signUp.getKey())} color="secondary" variant="outlined">
      {({ closeModal }) => {
        const handleClose = React.useCallback(() => {
          hideSuccessful();
          closeModal();
        }, [closeModal]);

        return displaySuccessfulMessage ? (
          <div>
            <Typography variant="h5" gutterBottom>
              {t(tKeys.successfulRegistration.title.getKey())}
            </Typography>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography>{t(tKeys.successfulRegistration.message.getKey())}</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleClose}>
                  {t(tKeys.buttons.ok.getKey())}
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <SignUpForm onCancel={closeModal} onSuccessful={displaySuccessful} />
        );
      }}
    </ModalButton>
  );
}
