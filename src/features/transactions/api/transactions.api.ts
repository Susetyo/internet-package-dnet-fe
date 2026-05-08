import { api } from '../../../shared/api/axios-conf';
import type { Transaction, TransactionStatus } from '../types/transaction.types';

type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  status?: TransactionStatus | 'all';
};

const toStartIso = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString();
const toEndIso = (date: string) => new Date(`${date}T23:59:59.999Z`).toISOString();

export const transactionsApi = {
  getAll: async (filters: TransactionFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.startDate) params.set('createdAt_gte', toStartIso(filters.startDate));
    if (filters.endDate) params.set('createdAt_lte', toEndIso(filters.endDate));
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);

    const query = params.toString();
    return (await api.get<Transaction[]>(`/transactions${query ? `?${query}` : ''}`)).data;
  },
  create: async (payload: Transaction) => (await api.post<Transaction>('/transactions', payload)).data,
};
