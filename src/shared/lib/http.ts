import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { refreshToken, tokenStorage } from '@/shared/utils';
import { logout, store } from '@/shared/store';
import { API_BASE_URL } from '../constants';

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const http = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  // paramsSerializer: (params) => {
  //   const searchParams = new URLSearchParams();

  //   Object.entries(params).forEach(([key, value]) => {
  //     if (value == null) return;

  //     if (Array.isArray(value)) {
  //       value.forEach((item) => {
  //         searchParams.append(key, String(item));
  //       });
  //     } else {
  //       searchParams.append(key, String(value));
  //     }
  //   });

  //   return searchParams.toString();
  // },
});

http.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccess();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// const AUTH_ENDPOINTS = [
//   AUTH_PATH.SIGN_IN,
//   AUTH_PATH.SIGN_UP,
//   // AUTH_PATH.REFRESH_TOKEN,
// ];

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error?: unknown, token?: string) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const requestUrl = originalRequest.url ?? '';

    const isAuthApi = () => requestUrl.startsWith('/auth/');

    if (status === 401 && !originalRequest._retry && !isAuthApi()) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (accessToken) => {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              resolve(http(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const tokens = await refreshToken();

        processQueue(undefined, tokens.accessToken);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        return http(originalRequest);
      } catch (err) {
        processQueue(err);

        store.dispatch(logout());

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(
      error.response?.data ?? {
        statusCode: 500,
        message: 'error.internal-server',
      },
    );
  },
);
