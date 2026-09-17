import { QUERY_KEY } from '@/shared/constants';
import { useQuery } from '@tanstack/react-query';
import { tokenStorage } from '@/shared/utils';
import { userService } from '../services';

interface UseGetMeOptions {
  enabled?: boolean;
}

const useGetMe = (options?: UseGetMeOptions) => {
  const accessToken = tokenStorage.getAccess();

  return useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => userService.getMe(),
    enabled: !!accessToken && options?.enabled,
    retry: 3,
  });
};

export { useGetMe };
