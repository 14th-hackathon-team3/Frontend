import { apiRequest, tokenStorage } from './client';

export const authApi = {
  async login({ email, password }) {
    const data = await apiRequest('/api/accounts/login/', { method: 'POST', body: { email, password } });
    tokenStorage.setTokens(data);
    return data;
  },
  signup: (payload) => apiRequest('/api/accounts/signup/', { method: 'POST', body: payload }),
  socialLogin: (payload) => apiRequest('/api/accounts/social-login/', { method: 'POST', body: payload }),
  refresh: async () => {
    const data = await apiRequest('/api/accounts/token/refresh/', { method: 'POST', body: { refresh: tokenStorage.getRefreshToken() } });
    tokenStorage.setTokens(data);
    return data;
  },
  me: () => apiRequest('/api/accounts/me/', { auth: true }),
  logout: async () => {
    try {
      return await apiRequest('/api/accounts/logout/', {
        method: 'POST',
        body: { refresh: tokenStorage.getRefreshToken() },
        auth: true,
      });
    } finally {
      tokenStorage.clear();
    }
  },
  updateMe: (payload) => apiRequest('/api/accounts/me/', { method: 'PATCH', body: payload, auth: true }),
  uploadPhoto: (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return apiRequest('/api/accounts/me/photo/', { method: 'PATCH', body: formData, auth: true });
  },
  withdraw: async () => {
    try {
      return await apiRequest('/api/accounts/withdraw/', { method: 'DELETE', auth: true });
    } finally {
      tokenStorage.clear();
    }
  },
};
