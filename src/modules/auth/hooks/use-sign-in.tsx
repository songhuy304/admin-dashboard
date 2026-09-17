import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

import { authService } from '../services';
import { ISignInRequest } from '../types';
import { useNavigate } from 'react-router-dom';
import { tokenStorage } from '@/shared/utils';
import { useTranslation } from 'react-i18next';

const useSignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signInMutation = useMutation({
    mutationFn: (payload: ISignInRequest) => authService.signIn(payload),

    onSuccess: (data) => {
      tokenStorage.setTokens(data.data);
      message.success('Sign in successful!');
      navigate('/', { replace: true });
    },

    onError: (error) => {
      message.error(t(error.message));
    },
  });

  const onSubmit = async (values: ISignInRequest) => {
    await signInMutation.mutateAsync(values);
  };

  return {
    ...signInMutation,
    onSubmit,
  };
};

export { useSignIn };
