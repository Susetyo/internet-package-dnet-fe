import { api } from '../../../shared/api/axios-conf';
import type { LoginPayload, User } from '../types/auth.types';

export const login = async (payload: LoginPayload) => {
  const { data } = await api.get<User[]>(`/users?email=${payload.email}&password=${payload.password}`);

  if (!data[0]) throw new Error('Email atau password salah');

  const { ...user } = data[0];

  return user as User;
};
