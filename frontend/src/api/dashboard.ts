import { DashboardSummary } from '../types';
import { apiRequest } from './client';

export const dashboardApi = {
  getSummary: (token: string) => apiRequest<DashboardSummary>('/dashboard/summary', { token }),
};
