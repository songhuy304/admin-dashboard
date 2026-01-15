import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

interface SideBarProps {
  collapsed: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed }) => {
  const {
    token: { colorBgContainer, colorSplit },
  } = theme.useToken();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: colorBgContainer,
        boxShadow: `1px 0 0 0 ${colorSplit}`,
      }}
    >
      <Menu mode="inline" defaultSelectedKeys={['1']} />
    </Sider>
  );
};

export default SideBar;
