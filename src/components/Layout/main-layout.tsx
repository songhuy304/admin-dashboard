import { Layout } from 'antd';
import { useState } from 'react';
import AppHeader from './header';
import { Outlet } from 'react-router-dom';
import SideBar from './sidebar';
import AppBootstrap from './app-provider';

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AppBootstrap>
      <Layout className="layout_main">
        <SideBar collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} onToggle={handleToggle} />
          <Content className="layout_content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AppBootstrap>
  );
};

export default MainLayout;
