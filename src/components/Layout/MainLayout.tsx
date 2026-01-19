import { Layout } from 'antd';
import { useState } from 'react';
import { SideBar } from '.';
import AppHeader from './Header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout_main">
      <SideBar collapsed={collapsed} />
      <Layout>
        <AppHeader collapsed={collapsed} onToggle={handleToggle} />
        <Content className="layout_content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
