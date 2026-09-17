import { http } from '@/shared/lib';
import {
  IForgotPasswordRequest,
  IRefreshTokenRequest,
  IResetPasswordRequest,
  ISignInRequest,
  ISignUpRequest,
  ITokenResponse,
  IVerifyTokenRequest,
} from '../types';

export const authService = {
  signIn: (payload: ISignInRequest): Promise<IResponse<ITokenResponse>> =>
    http.post('/auth/login', payload),

  signUp: (payload: ISignUpRequest): Promise<IApiBaseResponse> =>
    http.post('/auth/signup', payload),

  forgotPassword: (
    payload: IForgotPasswordRequest,
  ): Promise<IApiBaseResponse> => http.post('/auth/forgot-password', payload),

  resetPassword: (payload: IResetPasswordRequest): Promise<IApiBaseResponse> =>
    http.post('/auth/reset-password', payload),

  verifyToken: (
    payload: IVerifyTokenRequest,
  ): Promise<IResponse<ITokenResponse>> => http.post('/auth/verify', payload),

  refreshToken: (
    payload: IRefreshTokenRequest,
  ): Promise<IResponse<ITokenResponse>> =>
    http.post('/auth/refresh-token', payload),
};
