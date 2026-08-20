import { apiRequest } from './client';

export const notificationsApi = {
  getAll: () => apiRequest('/api/notifications/', { auth: true }),
  markRead: (id) => apiRequest(`/api/notifications/${id}/read/`, { method: 'PATCH', auth: true }),
  markAllRead: () => apiRequest('/api/notifications/read-all/', { method: 'PATCH', auth: true }),
};
