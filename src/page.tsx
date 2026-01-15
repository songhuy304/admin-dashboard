import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { useTheme } from './shared/hooks/useTheme';
import { router } from './routers';

const Page = () => {
  const theme = useTheme();
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: theme,
      }}>
      <React.Suspense fallback={<Component />}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </React.Suspense>
    </ConfigProvider>
  );
};

export default Page;
