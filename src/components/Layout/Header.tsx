import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

const { Header } = Layout;
interface AppHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, onToggle }) => {
  const {
    token: { colorBgContainer, colorSplit },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        boxShadow: `0 1px 0 0 ${colorSplit}`,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
      />
    </Header>
  );
};

export default AppHeader;
