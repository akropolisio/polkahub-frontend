import build from 'build-route-tree';

const rawTree = {
  demo: null,
  nodes: null,
  'my-nodes': null,
};

export const routes = build(rawTree);
