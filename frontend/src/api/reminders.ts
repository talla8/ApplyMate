import { Reminder } from '../types';
import { apiRequest } from './client';

export const remindersApi = {
  list: (token: string) => apiRequest<Reminder[]>('/reminders', { token }),
  update: (token: string, id: string, payload: Partial<Reminder>) =>
    apiRequest<Reminder>(`/reminders/${id}`, {
      method: 'PATCH',
      token,
      body: payload,
    }),
  delete: (token: string, id: string) =>
    apiRequest<{ message: string }>(`/reminders/${id}`, {
      method: 'DELETE',
      token,
    }),
};
