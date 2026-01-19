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

  // expand example call api

  // const [pagination] = useState({
  //   page: 1,
  //   per_page: 10,
  // });

  // const { data, loading, error } = useQuery(GET_USER_DETAIL, {
  //   variables: {
  //     id: '1',
  //   },
  // });

  // const { data: usersData } = useQuery(GET_USERS, {
  //   variables: {
  //     page: pagination.page,
  //     per_page: pagination.per_page,
  //   },
  // });

  // console.log(data, loading, error);

  return <div>ádasd</div>;
};

export default HomePage;
