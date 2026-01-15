import { Component } from 'react';
import { RouteObject } from 'react-router-dom';

// const Login = React.lazy(() => import('@/pages/'));
// const Register = React.lazy(() => import('@/pages/register/register'));

export const authRoutes: RouteObject = {
  path: '/',
  children: [{ path: '', element: <Component /> }],
};
