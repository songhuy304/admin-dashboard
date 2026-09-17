import React from 'react';

const MainLayout = React.lazy(() => import('./main-layout'));
const AppHeader = React.lazy(() => import('./header'));
const Sidebar = React.lazy(() => import('./sidebar'));
import { AuthLayout } from './auth-layout';

export { MainLayout, Sidebar, AppHeader, AuthLayout };
