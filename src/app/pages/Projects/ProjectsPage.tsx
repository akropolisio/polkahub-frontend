import * as React from 'react';

import { AllProjects, UserProjects, UserApplications } from 'features/projects';

export function AllProjectsPage() {
  return <AllProjects />;
}

export function MyProjectsPage() {
  return <UserProjects />;
}

export function MyApplicationsPage() {
  return <UserApplications />;
}
