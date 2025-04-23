import {User} from '@prisma/client';
import {api} from './instance';

export const getMe = async () => {
  return await api.get<User>('/auth/me');
};
