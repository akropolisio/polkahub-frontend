import * as React from 'react';

import { Button, Loading } from 'components';
import { useCommunication } from 'utils/react';
import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

const tKeys = tKeysAll.features.auth;

export function LogoutButton(props: React.ComponentPropsWithoutRef<typeof Button>) {
  const api = useApi();
  const { t } = useTranslate();
  const logoutCommunication = useCommunication(() => api.logout(), []);

  const handleOnClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      logoutCommunication.execute();
      props.onClick && props.onClick(event);
    },
    [logoutCommunication.execute],
  );

  return (
    <Button
      {...props}
      onClick={handleOnClick}
      endIcon={
        <Loading
          ignoreError
          communication={logoutCommunication}
          progressVariant="circle"
          progressProps={{
            size: 24,
          }}
        />
      }
    >
      {t(tKeys.logout.getKey())}
    </Button>
  );
}
