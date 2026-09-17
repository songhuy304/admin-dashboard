import { AuthLayout } from '@/components';
import * as Pages from '@/modules';
import { RouteObject } from 'react-router-dom';
import { AUTH_PATH } from './path';

export const authRoutes: RouteObject = {
  path: '/',
  element: <AuthLayout />,
  children: [
    { path: AUTH_PATH.SIGN_IN, element: <Pages.SignInPage /> },
    { path: AUTH_PATH.SIGN_UP, element: <Pages.SignUpPage /> },
  ],
};
