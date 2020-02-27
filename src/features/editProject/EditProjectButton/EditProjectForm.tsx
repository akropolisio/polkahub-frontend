import * as React from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import { Grid, Typography, Hint, Button, CircularProgress } from 'components';
import { useApi } from 'services/api';
import { TextInputField } from 'components/form';
import { getErrorMsg } from 'utils';
import { isRequired } from 'utils/validators';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

const tKeys = tKeysAll.features.editProject;

interface IProps {
  onSuccessful: () => void;
  onCancel: () => void;
  name: string;
  description: string | null;
  id: number;
}

interface IFormData {
  description: string;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  description: 'description',
};

export function EditProjectForm(props: IProps) {
  const { onCancel, onSuccessful, description, id, name } = props;
  const api = useApi();
  const { t } = useTranslate();

  const initialValues: IFormData = React.useMemo(
    () => ({
      description: description || '',
    }),
    [description],
  );

  const handleFormSubmit = React.useCallback(
    async (
      data: IFormData,
    ): Promise<{
      [FORM_ERROR]: string;
    } | void> => {
      try {
        await api.updateProject({ id, ...data });
        onSuccessful();
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [onSuccessful, id],
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
                {t(tKeys.formTitle.getKey(), { name })}
              </Typography>

              <TextInputField
                fullWidth
                multiline
                validate={isRequired}
                name={fieldNames.description}
                label={t(tKeys.fields.description.getKey())}
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
