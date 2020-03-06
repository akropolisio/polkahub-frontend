import build from 'build-route-tree';

const rawTree = {
  demo: null,
  about: null,
  projects: null,
  'my-projects': null,
  'my-applications': null,
};

export const routes = build(rawTree);
