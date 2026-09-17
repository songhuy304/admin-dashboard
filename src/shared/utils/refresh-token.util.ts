import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { tokenStorage } from './auth';

export const refreshToken = async () => {
  const refresh = tokenStorage.getRefresh();

  if (!refresh) {
    throw new Error('Refresh token not found');
  }

  const data = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
    refreshToken: refresh,
  });

  const tokenData = data?.data ?? data;

  if (!tokenData?.accessToken || !tokenData?.refreshToken) {
    throw new Error('Invalid refresh token response');
  }

  tokenStorage.setTokens({
    accessToken: tokenData.accessToken,
    refreshToken: tokenData.refreshToken,
  });

  return tokenData;
};
