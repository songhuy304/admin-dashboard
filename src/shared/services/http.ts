import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/shared/constant';
import { getToken } from '@/shared/utils';

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
