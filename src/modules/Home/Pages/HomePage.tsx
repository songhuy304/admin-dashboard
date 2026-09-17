import { usePageHeader } from '@/shared/hooks';

const HomePage = () => {
  usePageHeader({
    title: 'Trang chủ',
    breadcrumb: [
      {
        title: 'Quản lý người dùng',
      },
    ],
  });

  return <div>ádasd</div>;
};

export default HomePage;
