import type { Rule } from 'antd/es/form';

export const signUpValidation = {
  email: [
    {
      required: true,
      message: 'Please enter your email',
    },
    {
      type: 'email',
      message: 'Please enter a valid email',
    },
  ] satisfies Rule[],

  fullName: [
    {
      required: true,
      message: 'Please enter your full name',
    },
    {
      min: 6,
      message: 'Full name must be at least 6 characters',
    },
  ] satisfies Rule[],

  password: [
    {
      required: true,
      message: 'Please enter your password',
    },
    {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password must be at least 8 characters and contain uppercase, lowercase, number and special character',
    },
  ] satisfies Rule[],
};
