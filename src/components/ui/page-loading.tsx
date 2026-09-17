import { Spin } from 'antd';

const PageLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spin size="large" />
    </div>
  );
};

export { PageLoading };
