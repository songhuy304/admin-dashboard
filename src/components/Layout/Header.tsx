import { useAppSelector } from '@/shared/hooks/redux';
import { selectSubHeaders } from '@/store';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Space, theme } from 'antd';

const { Header } = Layout;
interface AppHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, onToggle }) => {
  const {
    token: { colorBgContainer, colorSplit },
  } = theme.useToken();

  const subHeaders = useAppSelector(selectSubHeaders);

  return (
    <Header
      style={{
        background: colorBgContainer,
        boxShadow: `0 1px 0 0 ${colorSplit}`,
      }}
      className="app-header"
    >
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
        />
        <Breadcrumb separator=">" items={subHeaders} />
      </Space>
    </Header>
  );
};

export default AppHeader;
