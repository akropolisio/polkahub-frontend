import * as React from 'react';

import { Button, Loading } from 'components';

type Props = Pick<React.ComponentPropsWithoutRef<typeof Button>, 'color'>;

export function AuthButton({ color }: Props) {
  return (
    <Button
      color={color}
      variant="outlined"
      endIcon={
        <Loading
          ignoreError
          meta={{ loaded: true, error: null }}
          progressVariant="circle"
          progressProps={{
            size: 24,
          }}
        />
      }
    >
      Sign in / Sign up
    </Button>
  );
}
