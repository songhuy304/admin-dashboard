import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { authRoutes } from './routes';

const routes: RouteObject[] = [authRoutes];

export const router = createBrowserRouter(routes);
