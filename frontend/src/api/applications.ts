import { Application, Contact, DocumentChecklist, Reminder } from '../types';
import { apiRequest } from './client';

export const applicationsApi = {
  list: (token: string, query = '') =>
    apiRequest<Application[]>(`/applications${query}`, { token }),
  get: (token: string, id: string) =>
    apiRequest<Application>(`/applications/${id}`, { token }),
  create: (token: string, payload: Partial<Application>) =>
    apiRequest<Application>('/applications', {
      method: 'POST',
      token,
      body: payload,
    }),
  update: (token: string, id: string, payload: Partial<Application>) =>
    apiRequest<Application>(`/applications/${id}`, {
      method: 'PATCH',
      token,
      body: payload,
    }),
  delete: (token: string, id: string) =>
    apiRequest<{ message: string }>(`/applications/${id}`, {
      method: 'DELETE',
      token,
    }),
  getChecklist: (token: string, applicationId: string) =>
    apiRequest<DocumentChecklist>(`/applications/${applicationId}/checklist`, { token }),
  updateChecklist: (
    token: string,
    applicationId: string,
    payload: Partial<DocumentChecklist>,
  ) =>
    apiRequest<DocumentChecklist>(`/applications/${applicationId}/checklist`, {
      method: 'PATCH',
      token,
      body: payload,
    }),
  addReminder: (token: string, applicationId: string, payload: Partial<Reminder>) =>
    apiRequest<Reminder>(`/applications/${applicationId}/reminders`, {
      method: 'POST',
      token,
      body: payload,
    }),
  addContact: (token: string, applicationId: string, payload: Partial<Contact>) =>
    apiRequest<Contact>(`/applications/${applicationId}/contacts`, {
      method: 'POST',
      token,
      body: payload,
    }),
};
