export const APP_ROUTES = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
  },
} as const;
