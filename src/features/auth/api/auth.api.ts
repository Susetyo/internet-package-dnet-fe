import { api } from '../../../shared/api/axios-conf';
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  User,
} from '../types/auth.types';

export const login = async (payload: LoginPayload) => {
  const { data } = await api.get<User[]>(`/users?email=${payload.email}&password=${payload.password}`);

  if (!data[0]) throw new Error('Email atau password salah');

  const { ...user } = data[0];

  return user as User;
};

export const register = async (payload: RegisterPayload) => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const { data: existingUsers } = await api.get<User[]>(
    `/users?email=${encodeURIComponent(normalizedEmail)}`,
  );

  if (existingUsers[0]) throw new Error('Email sudah terdaftar');

  const timestamp = Date.now();
  const customerId = `c-${timestamp}`;

  await api.post('/customers', {
    id: customerId,
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    email: normalizedEmail,
    segment: 'Silver',
    status: 'active',
  });

  const { data: user } = await api.post<User>('/users', {
    id: String(timestamp),
    name: payload.name.trim(),
    email: normalizedEmail,
    password: payload.password,
    role: 'customer',
    customerId,
  });

  return user;
};

export const resetPassword = async (payload: ForgotPasswordPayload) => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const { data: users } = await api.get<User[]>('/users');
  const user = users.find(
    (item) => item.email.trim().toLowerCase() === normalizedEmail,
  );

  if (!user) throw new Error('Email tidak ditemukan');

  await api.put<User>(`/users/${user.id}`, {
    ...user,
    password: payload.password,
  });
};
