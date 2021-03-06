import * as React from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import { Grid, Typography, Hint, Button, CircularProgress, Box } from 'components';
import { useApi } from 'services/api';
import { TextInputField } from 'components/form';
import { getErrorMsg } from 'utils';
import { isRequired } from 'utils/validators';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

const tKeys = tKeysAll.features.auth;

interface IProps {
  onSuccessful: () => void;
  onCancel: () => void;
  onForgotClick: () => void;
}

interface IFormData {
  email: string;
  password: string;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  email: 'email',
  password: 'password',
};

const initialValues: IFormData = {
  email: '',
  password: '',
};

export function SignInForm(props: IProps) {
  const { onCancel, onSuccessful, onForgotClick } = props;
  const api = useApi();
  const { t } = useTranslate();

  const handleFormSubmit = React.useCallback(
    async (
      data: IFormData,
    ): Promise<{
      [FORM_ERROR]: string;
    } | void> => {
      try {
        await api.login(data);
        onSuccessful();
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [onSuccessful],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      subscription={{ submitError: true, submitting: true, dirtySinceLastSubmit: true }}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {t(tKeys.signIn.getKey())}
              </Typography>

              <TextInputField
                fullWidth
                validate={isRequired}
                name={fieldNames.email}
                label={t(tKeys.fields.email.getKey())}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputField
                fullWidth
                validate={isRequired}
                name={fieldNames.password}
                type="password"
                label={t(tKeys.fields.password.getKey())}
              />
            </Grid>
            {!dirtySinceLastSubmit && !!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">
                    {t(
                      tKeys.errors[
                        submitError as 'account not found, please registered and auth first'
                      ]?.getKey() || submitError,
                    )}
                  </Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs>
              <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
                {t(tKeys.buttons.cancel.getKey())}
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : t(tKeys.buttons.submit.getKey())}
              </Button>
            </Grid>
            <Grid item>
              <Box clone style={{ textTransform: 'none' }}>
                <Button variant="text" color="primary" onClick={onForgotClick}>
                  {t(tKeys.buttons.forgotPassword.getKey())}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}
