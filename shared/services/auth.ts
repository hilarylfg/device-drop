import {User} from '@prisma/client';
import {api} from './instance';

interface RegisterResponse {
  message: string;
}

export const getMe = async () => {
  return await api.get<User>('auth/me');
};

export const register = async (firstName: string, email: string, password: string) => {
  return api.post<RegisterResponse>('auth/register', { body: { firstName, email, password } });
};

export const verifyCode = async (code: string) => {
  return api.post('auth/verify', { code });
}