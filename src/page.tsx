import { ConfigProvider } from 'antd';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { useTheme } from './shared/hooks/useTheme';
import './styles/_theme.scss';

const Page = () => {
  const theme = useTheme();
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: theme,
      }}
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ConfigProvider>
  );
};

export default Page;
