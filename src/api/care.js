import { apiRequest } from './client';

export const careApi = {
  getDailyLogs: (days) => {
    const query = days == null ? '' : `?days=${encodeURIComponent(days)}`;
    return apiRequest(`/api/care/daily-logs/${query}`, { auth: true });
  },
  createDailyLog: (payload) => apiRequest('/api/care/daily-logs/', { method: 'POST', body: payload, auth: true }),
  getDailyLog: (id) => apiRequest(`/api/care/daily-logs/${id}/`, { auth: true }),
  updateDailyLog: (id, payload) => apiRequest(`/api/care/daily-logs/${id}/`, { method: 'PATCH', body: payload, auth: true }),
  replaceDailyLog: (id, payload) => apiRequest(`/api/care/daily-logs/${id}/`, { method: 'PUT', body: payload, auth: true }),
  getTodayDailyLog: () => apiRequest('/api/care/daily-logs/today/', { auth: true }),
  getMyCare: () => apiRequest('/api/care/me/', { auth: true }),
  createOnboarding: (payload) => apiRequest('/api/care/onboarding/', { method: 'POST', body: payload, auth: true }),
  createVoiceMemo: (payload) => apiRequest('/api/care/voice-memos/', { method: 'POST', body: payload, auth: true }),
  getVoiceMemos: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/api/care/voice-memos/${query ? `?${query}` : ''}`, { auth: true });
  },
  getVoiceMemo: (id) => apiRequest(`/api/care/voice-memos/${id}/`, { auth: true }),
  confirmPlan: (planId) => apiRequest(`/api/care/plans/${planId}/confirm/`, { method: 'POST', auth: true }),
  generatePlan: () => apiRequest('/api/care/plans/generate/', { method: 'POST', auth: true }),
  getTodo: (id) => apiRequest(`/api/care/todos/${id}/`, { auth: true }),
  updateTodo: (id, payload) => apiRequest(`/api/care/todos/${id}/`, { method: 'PATCH', body: payload, auth: true }),
  replaceTodo: (id, payload) => apiRequest(`/api/care/todos/${id}/`, { method: 'PUT', body: payload, auth: true }),
  deleteTodo: (id) => apiRequest(`/api/care/todos/${id}/`, { method: 'DELETE', auth: true }),
  checkTodo: (id) => apiRequest(`/api/care/todos/${id}/check/`, { method: 'POST', auth: true }),
  updateTodoVisibility: (id, payload) => apiRequest(`/api/care/todos/${id}/visibility/`, { method: 'PATCH', body: payload, auth: true }),
  getTodayTodos: () => apiRequest('/api/care/todos/today/', { auth: true }),
  getWeekTrend: () => apiRequest('/api/care/journey/week-trend/', { auth: true }),
  updateMyCare: (payload) => apiRequest('/api/care/me/', { method: 'PATCH', body: payload, auth: true }),
};
