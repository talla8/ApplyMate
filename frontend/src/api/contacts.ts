import { Contact } from '../types';
import { apiRequest } from './client';

export const contactsApi = {
  update: (token: string, id: string, payload: Partial<Contact>) =>
    apiRequest<Contact>(`/contacts/${id}`, {
      method: 'PATCH',
      token,
      body: payload,
    }),
  delete: (token: string, id: string) =>
    apiRequest<{ message: string }>(`/contacts/${id}`, {
      method: 'DELETE',
      token,
    }),
};
