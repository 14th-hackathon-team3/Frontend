import { apiRequest } from './client';

export const contentApi = {
  getStages: () => apiRequest('/api/content/stages/'),
  getCurrentStage: (week) => apiRequest(`/api/content/stages/current/?week=${encodeURIComponent(week)}`),
};
