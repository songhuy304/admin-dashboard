import { MainLayout } from '@/components';
import { HomePage } from '@/modules/Home/Pages';
import { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [{ path: '', element: <HomePage /> }],
};
