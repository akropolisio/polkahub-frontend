import * as React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown-now';

import { Button, Loading } from 'components';
import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useCommunication, useOnChangeState } from 'utils/react';
import { RESEND_CODE_FOR_PASSWORD_CHANGING_DELAY } from 'env';

const tKeys = tKeysAll.features.auth;

interface IProps {
  email: string;
}

export function ResetButton(props: IProps) {
  const { email } = props;
  const api = useApi();
  const { t } = useTranslate();

  const countdownRef = React.useRef<Countdown | null>(null);

  const [resendDate, setResendDate] = React.useState(
    () => Date.now() + RESEND_CODE_FOR_PASSWORD_CHANGING_DELAY,
  );

  React.useEffect(() => countdownRef.current?.start(), [resendDate]);

  const resetClickCommunication = useCommunication(() => api.resetPassword({ email }), [email]);

  useOnChangeState(
    resetClickCommunication.status,
    (a, b) => a === 'pending' && b !== 'pending',
    () => setResendDate(Date.now() + RESEND_CODE_FOR_PASSWORD_CHANGING_DELAY),
  );

  const countdownRenderer = React.useCallback(
    ({ completed, total }: CountdownRenderProps) => {
      return (
        <Button
          disabled={!completed}
          color="primary"
          variant="outlined"
          onClick={resetClickCommunication.execute}
          endIcon={
            <Loading
              ignoreError
              meta={{ loaded: resetClickCommunication.status !== 'pending', error: null }}
              communication={resetClickCommunication}
              progressVariant="circle"
              progressProps={{
                size: 24,
              }}
            />
          }
        >
          {t(tKeys.buttons.resendCode.getKey())}
          {!completed ? ` (${Math.round(total / 1000)})` : ''}
        </Button>
      );
    },
    [t, resetClickCommunication],
  );

  return (
    <Countdown
      ref={countdownRef}
      autoStart
      daysInHours
      date={resendDate}
      renderer={countdownRenderer}
    />
  );
}
