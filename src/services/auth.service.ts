import api from '@/lib/api';
import type { User } from '@/types';

interface LoginInput {
  universityId: string;
  password: string;
}

interface FirstTimeLoginInput {
  universityId: string;
  oneTimePassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordInput {
  universityId: string;
}

interface ResetPasswordInput {
  universityId: string;
  otp: string;
  newPassword: string;
}

interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AuthTokensResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
}

export const authService = {
  login: (data: LoginInput) =>
    api.post<AuthTokensResponse>('/auth/login', data),

  firstTimeLogin: (data: FirstTimeLoginInput) =>
    api.post<AuthTokensResponse>('/auth/first-time-login', data),

  logout: () =>
    api.post('/auth/logout'),

  refreshToken: () =>
    api.post<{ success: boolean; data: { accessToken: string } }>('/auth/refresh-token'),

  forgotPassword: (data: ForgotPasswordInput) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordInput) =>
    api.post('/auth/reset-password', data),

  changePassword: (data: ChangePasswordInput) =>
    api.post('/auth/change-password', data),

  getProfile: () =>
    api.get<{ success: boolean; data: User }>('/auth/profile'),

  getUserByUniversityId: (universityId: string) =>
    api.get<{ success: boolean; data: User }>(`/auth/users/${universityId}`),
};
