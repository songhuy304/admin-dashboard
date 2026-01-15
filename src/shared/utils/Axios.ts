import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getToken, removeToken } from '@/shared/utils/auth';

const instance = axios.create({
  timeout: 6000,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const noToken = (config.headers ?? { noToken: false }).noToken === false;
    const token = getToken();
    if (Boolean(token) && !noToken && Boolean(config.headers)) {
      config.headers.Authorization = `Bearer ${token}`; // token
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return await Promise.resolve(response);
  },
  async (error) => {
    const response = error.response;

    if (response?.status) {
      switch (response.status) {
        case 401:
          removeToken();

          if (!['/api/me'].includes(response?.config?.url)) {
            window.location.href = '/login';
          }
          break;
        default:
          if (response.status !== 401) {
          }
          break;
      }
      if (error.response) {
        error.message = error.response.data.message;
      } else if (error.request) {
        error.message = 'No response from server.';
      } else {
        error.message = 'Something went wrong.';
      }
    }

    return await Promise.reject(error);
  },
);

/**
 * axios 封装
 *
 * @param configParam axios config param
 * @returns Promise
 */
async function Axios<T = unknown>(configParam: AxiosRequestConfig): Promise<Response.Common<T>> {
  return await instance
    .request<Response.Common<T>, AxiosResponse<Response.Common<T>>>(configParam)
    .then((res) => res.data);
}

export default Axios;
