import * as React from 'react';

import { Hint } from 'components';
import { AllProjects } from 'features/allProjects';

export function AllProjectsPage() {
  return <AllProjects />;
}

export function MyProjectsPage() {
  return <Hint>Coming soon</Hint>;
}

export function MyApplicationsPage() {
  return <Hint>Coming soon</Hint>;
}
