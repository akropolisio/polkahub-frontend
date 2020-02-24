import * as React from 'react';

import { AuthButton } from 'features/auth';
import { Typography } from 'components';

export function DemoPage() {
  return (
    <div>
      <AuthButton />
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
    </div>
  );
}
