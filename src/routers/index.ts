export * from './path';

import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { authRoutes } from './auth.route';
import { homeRoutes } from './home.route';

const routes: RouteObject[] = [authRoutes, homeRoutes];

export const router = createBrowserRouter(routes);
