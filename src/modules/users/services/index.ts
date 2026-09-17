import { http } from '@/shared/lib';

const PATH = {
  GET_ME: '/users/me',
  UPDATE_PROFILE: '/users/update-profile',
  CHANGE_PASSWORD: '/users/change-password',
};

export const userService = {
  getMe: (): Promise<IResponse<User>> => http.get(PATH.GET_ME),
  updateProfile: (formData: FormData): Promise<IResponse<User>> =>
    http.put(PATH.UPDATE_PROFILE, formData),
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ): Promise<IResponse<void>> =>
    http.post(PATH.CHANGE_PASSWORD, { currentPassword, newPassword }),
};
