import { Node } from 'model';

import { BackendNode } from './types';

export function convertNode(node: BackendNode): Node {
  return {
    createdAt: node.created_at,
    description: node.description,
    httpUrl: node.http_url,
    login: node.login,
    name: node.name,
    repoUrl: node.repo_url,
    updatedAt: node.updated_at,
    version: node.version,
    wsUrl: node.ws_url,
  };
}
