import * as React from 'react';

import { Auth } from 'features/auth';
import { Typography } from 'components';

export function DemoPage() {
  return (
    <div>
      <Auth />
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
    </div>
  );
}
