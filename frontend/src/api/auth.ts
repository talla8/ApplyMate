import { AuthResponse, User } from '../types';
import { apiRequest } from './client';

export const authApi = {
  register: (payload: { name: string; email: string; password: string }) =>
    apiRequest<AuthResponse>('/auth/register', { method: 'POST', body: payload }),
  login: (payload: { email: string; password: string }) =>
    apiRequest<AuthResponse>('/auth/login', { method: 'POST', body: payload }),
  me: (token: string) => apiRequest<User>('/auth/me', { token }),
};
