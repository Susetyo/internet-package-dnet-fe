import { api } from '../../../shared/api/axios-conf';
import type { Customer } from '../types/customer.types';

export type CreateCustomerPayload = Omit<Customer, 'id'> & {
  id?: string;
};

export const customersApi = {
  getAll: async () => (await api.get<Customer[]>('/customers')).data,
  getById: async (id: string) => (await api.get<Customer>(`/customers/${id}`)).data,
  create: async (payload: CreateCustomerPayload) => (await api.post<Customer>('/customers', payload)).data,
  update: async (id: string, payload: Customer) => (await api.put<Customer>(`/customers/${id}`, payload)).data,
  remove: async (id: string) => (await api.delete(`/customers/${id}`)).data,
};
