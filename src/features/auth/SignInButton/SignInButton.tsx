import * as React from 'react';

import { ModalButton } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { SignInForm } from './SignInForm';
import { ResetForm } from './ResetForm';
import { ChangePasswordForm, SuccessfulChangeMessage } from './ChangePasswordForm';

const tKeys = tKeysAll.features.auth;

type Content = 'login' | 'reset' | 'change' | 'successfulChange';

export function SignInButton() {
  const { t } = useTranslate();
  const [contentType, setContentType] = React.useState<Content>('login');
  const [forgotEmail, setForgotEmail] = React.useState('');

  const toLogin = React.useCallback(() => setContentType('login'), []);
  const toReset = React.useCallback(() => setContentType('reset'), []);
  const toChange = React.useCallback(() => setContentType('change'), []);
  const toSuccessfulChange = React.useCallback(() => setContentType('successfulChange'), []);

  const handleResetSuccessful = React.useCallback(({ email }: { email: string }) => {
    setForgotEmail(email);
    toChange();
  }, []);

  return (
    <ModalButton
      content={t(tKeys.signIn.getKey())}
      color="secondary"
      variant="outlined"
      onClose={toLogin}
    >
      {({ closeModal }) => {
        const content: Record<Content, () => JSX.Element> = {
          login: () => (
            <SignInForm onCancel={closeModal} onSuccessful={closeModal} onForgotClick={toReset} />
          ),
          reset: () => <ResetForm onCancel={toLogin} onSuccessful={handleResetSuccessful} />,
          change: () => (
            <ChangePasswordForm
              onCancel={toLogin}
              onSuccessful={toSuccessfulChange}
              email={forgotEmail}
            />
          ),
          successfulChange: () => <SuccessfulChangeMessage onClose={closeModal} />,
        };

        return content[contentType]();
      }}
    </ModalButton>
  );
}
