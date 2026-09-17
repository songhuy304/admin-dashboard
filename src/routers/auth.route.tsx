import { AuthLayout } from '@/components';
import * as Pages from '@/modules';
import { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject = {
  path: '/sign-in',
  element: <AuthLayout />,
  children: [{ index: true, element: <Pages.SignInPage /> }],
};
