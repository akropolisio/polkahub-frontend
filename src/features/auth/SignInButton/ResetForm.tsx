/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import { Grid, Typography, Hint, Button, CircularProgress } from 'components';
import { useApi } from 'services/api';
import { TextInputField } from 'components/form';
import { getErrorMsg } from 'utils';
import { isRequired } from 'utils/validators';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

const tKeys = tKeysAll.features.auth;

interface IProps {
  onSuccessful: (data: IFormData) => void;
  onCancel: () => void;
}

interface IFormData {
  email: string;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  email: 'email',
};

const initialValues: IFormData = {
  email: '',
};

export function ResetForm(props: IProps) {
  const { onCancel, onSuccessful } = props;
  const api = useApi();
  const { t } = useTranslate();

  const handleFormSubmit = React.useCallback(
    async (
      data: IFormData,
    ): Promise<{
      [FORM_ERROR]: string;
    } | void> => {
      try {
        await api.resetPassword(data);
        onSuccessful(data);
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
                {t(tKeys.resetPassword.getKey())}
              </Typography>

              <TextInputField
                fullWidth
                validate={isRequired}
                name={fieldNames.email}
                label={t(tKeys.fields.email.getKey())}
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
