import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/shared/constants';
import { tokenStorage } from '../utils';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccess();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
