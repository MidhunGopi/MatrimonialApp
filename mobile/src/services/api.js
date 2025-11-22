import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this to your backend URL
// For Android emulator: use 10.0.2.2 instead of localhost
// For physical device: use your computer's IP address
const API_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'  // Android emulator
  : 'https://your-production-url.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Auth APIs
export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', {name, email, password});
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', {email, password});
  return response.data;
};

// Profile APIs
export const getProfiles = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      params.append(key, filters[key]);
    }
  });

  const response = await api.get(`/profiles?${params.toString()}`);
  return response.data;
};

export const getProfileById = async id => {
  const response = await api.get(`/profiles/${id}`);
  return response.data;
};

export const createProfile = async profileData => {
  const response = await api.post('/profiles', profileData);
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

export const sendMatchRequest = async profileId => {
  const response = await api.post('/matches', {profileId});
  return response.data;
};

export default api;
