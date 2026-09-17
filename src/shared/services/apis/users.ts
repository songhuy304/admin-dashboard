import type { Response } from 'typings/response';
import { http } from '../http';

export type IUser = {
  id: string;
  email: string;
  name: string;
  created_at?: string;
};

export type IUserListParams = {
  page: number;
  per_page: number;
};

export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
  list: (params: IUserListParams) => [...userKeys.all, 'list', params] as const,
};

export const getUserDetail = async (id: string) => {
  const { data } = await http.get<Response.Common<IUser>>(`/users/${id}`);
  return data;
};

export const getUsers = async (params: IUserListParams) => {
  const { data } = await http.get<Response.Pagination<IUser>>('/users', {
    params,
  });
  return data;
};
