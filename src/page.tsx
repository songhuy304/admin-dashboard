import { ConfigProvider } from 'antd';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import './styles/_theme.scss';

const Page = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF5629',
          borderRadius: 12,
        },
      }}
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ConfigProvider>
  );
};

export default Page;
