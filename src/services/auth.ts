import axios from '@/services/axios';
import type { RegisterData, LoginData, VerifyCodeResponse } from '@/types/Auth';
import type { User } from '@/types/User';

export const registerRequest = async (data: RegisterData) => {
  const response = await axios.post<User>('/auth/register', data);
  return response.data;
};

export const loginRequest = async (data: LoginData) => {
  const response = await axios.post<User>(`/auth/login`, data);
  return response.data;
};

export const verifyTokenRequest = async (
  token: string
): Promise<{
  user: User;
  token: string;
}> => {
  const response = await axios.post<{ user: User; token: string }>(
    `/auth/verify`,
    { token }
  );
  return response.data;
};

export const verifyLoginRequest = async (email: string, code: string) => {
  const response = await axios.post<VerifyCodeResponse>(
    '/auth/secondFactorAuthentication',
    {
      email,
      code,
    }
  );
  return response.data;
};

export const verifySignupRequest = async (email: string, code: string) => {
  const response = await axios.post<VerifyCodeResponse>('/auth/verifyCode', {
    email,
    code,
  });
  return response.data;
};
