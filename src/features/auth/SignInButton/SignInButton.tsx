import * as React from 'react';

import { ModalButton } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { SignInForm } from './SignInForm';

const tKeys = tKeysAll.features.auth;

export function SignInButton() {
  const { t } = useTranslate();
  return (
    <ModalButton content={t(tKeys.signIn.getKey())} color="secondary" variant="outlined">
      {({ closeModal }) => <SignInForm onCancel={closeModal} onSuccessful={closeModal} />}
    </ModalButton>
  );
}
