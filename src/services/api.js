import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Profile APIs
export const getProfiles = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  });
  
  const response = await api.get(`/profiles?${params.toString()}`);
  return response.data;
};

export const getProfileById = async (id) => {
  const response = await api.get(`/profiles/${id}`);
  return response.data;
};

export const createProfile = async (profileData) => {
  const response = await api.post('/profiles', profileData);
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await api.put(`/profiles/${id}`, profileData);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await api.get('/profiles/me/profile');
  return response.data;
};

// Match APIs
export const getMatches = async () => {
  const response = await api.get('/matches');
  return response.data;
};

export const sendMatchRequest = async (profileId) => {
  const response = await api.post('/matches', { profileId });
  return response.data;
};

export default api;
