import { MainLayout } from '@/components';
import { RouteObject, Navigate } from 'react-router-dom';
import * as Pages from '@/modules';

export const homeRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: <Pages.DashboardPage />,
    },
  ],
};
