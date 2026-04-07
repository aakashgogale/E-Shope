import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token and session ID to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopco_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  const sessionId = localStorage.getItem('shopco_session');
  if (sessionId) config.headers['x-session-id'] = sessionId;
  return config;
});

export default api;
