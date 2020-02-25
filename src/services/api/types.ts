export interface BackendNode {
  created_at: number;
  description: string | null;
  http_url: string;
  login: string;
  name: string;
  repo_url?: string;
  updated_at: number;
  version: string;
  ws_url: string;
}
