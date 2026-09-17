import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import { ISignUpRequest } from '../types';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH } from '@/routers';

export const useSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: (payload: ISignUpRequest) => authService.signUp(payload),
    onSuccess: () => {
      message.success(t('common.success'));
      navigate(AUTH_PATH.SIGN_IN, { replace: true });
    },
    onError: (error) => {
      message.error(t(error.message));
    },
  });

  const onSubmit = async (values: ISignUpRequest) => {
    await signupMutation.mutateAsync(values);
  };

  return { ...signupMutation, onSubmit };
};
