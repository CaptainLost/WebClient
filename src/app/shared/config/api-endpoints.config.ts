const AUTH_BASE = '/api/auth';

export const API_ENDPOINTS = {
  auth: {
    login: `${AUTH_BASE}/login`,
    logout: `${AUTH_BASE}/logout`,
    session: `${AUTH_BASE}/session`,
    register: `${AUTH_BASE}/register`,
  },
} as const;
