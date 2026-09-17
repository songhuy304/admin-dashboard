import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import { ISignUpRequest } from '../types';

export const useSignup = () => {
  const signupMutation = useMutation({
    mutationFn: (payload: ISignUpRequest) => authService.signUp(payload),
  });

  return { ...signupMutation };
};
