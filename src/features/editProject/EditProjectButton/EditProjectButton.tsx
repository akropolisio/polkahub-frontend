import * as React from 'react';

import { ModalButton } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';

import { EditProjectForm } from './EditProjectForm';

const tKeys = tKeysAll.features.editProject;

interface Props {
  name: string;
  description: string | null;
  id: number;
}

export function EditProjectButton(props: Props) {
  const { t } = useTranslate();
  const api = useApi();

  return (
    <ModalButton
      fullWidth
      content={t(tKeys.buttons.edit.getKey())}
      color="primary"
      variant="contained"
    >
      {({ closeModal }) => {
        const handleSuccessful = React.useCallback(() => {
          closeModal();
          api.reloadData();
        }, [closeModal]);

        return <EditProjectForm onCancel={closeModal} onSuccessful={handleSuccessful} {...props} />;
      }}
    </ModalButton>
  );
}
