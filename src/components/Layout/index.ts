import React from 'react';

const MainLayout = React.lazy(() => import('./MainLayout'));
const SideBar = React.lazy(() => import('./Sidebar'));
const AppHeader = React.lazy(() => import('./Header'));

export { MainLayout, SideBar, AppHeader };
