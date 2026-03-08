import api from '@/lib/api';
import type { LoginInput, FirstLoginInput } from '@/types';

export const authService = {
  login: (data: LoginInput) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  firstLogin: (data: FirstLoginInput) => api.post('/auth/first-login', data),
  forgotPassword: (identifier: string) => api.post('/auth/forgot-password', { identifier }),
  resetPassword: (token: string, password: string) => api.post('/auth/reset-password', { token, password }),
};
