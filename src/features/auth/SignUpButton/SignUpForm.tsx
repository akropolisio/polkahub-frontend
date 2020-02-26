import * as React from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import { Grid, Typography, Hint, Button, CircularProgress } from 'components';
import { useApi } from 'services/api';
import { TextInputField } from 'components/form';
import { getErrorMsg } from 'utils';
import { isRequired, isMatchPassword } from 'utils/validators';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

const tKeys = tKeysAll.features.auth;

interface IProps {
  onSuccessful: () => void;
  onCancel: () => void;
}

interface IFormData {
  email: string;
  password: string;
  passwordConfirm: string;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  email: 'email',
  password: 'password',
  passwordConfirm: 'passwordConfirm',
};

const initialValues: IFormData = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export function SignUpForm(props: IProps) {
  const { onCancel, onSuccessful } = props;
  const api = useApi();
  const { t } = useTranslate();

  const handleFormSubmit = React.useCallback(
    async ({
      email,
      password,
    }: IFormData): Promise<{
      [FORM_ERROR]: string;
    } | void> => {
      try {
        await api.signUp({
          email,
          password,
        });
        onSuccessful();
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [onSuccessful],
  );

  const validateForm = React.useCallback((values: IFormData) => {
    return {
      [fieldNames.passwordConfirm]: isMatchPassword(values.password, values.passwordConfirm),
    };
  }, []);

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      subscription={{ submitError: true, submitting: true, dirtySinceLastSubmit: true }}
      validate={validateForm}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {t(tKeys.signUp.getKey())}
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
            <Grid item xs={12}>
              <TextInputField
                fullWidth
                validate={isRequired}
                name={fieldNames.passwordConfirm}
                type="password"
                label={t(tKeys.fields.confirmPassword.getKey())}
              />
            </Grid>
            {!dirtySinceLastSubmit && !!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
                {t(tKeys.buttons.cancel.getKey())}
              </Button>
            </Grid>
            <Grid item xs={6}>
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
          </Grid>
        </form>
      )}
    </Form>
  );
}
