import { api } from '../../../shared/api/axios-conf';
import type { User } from '../../auth/types/auth.types';
import type {
  ManualPaymentCredentials,
  Transaction,
  TransactionStatus,
} from '../types/transaction.types';

type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  status?: TransactionStatus | 'all';
  customerId?: string;
};

const toStartIso = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString();
const toEndIso = (date: string) => new Date(`${date}T23:59:59.999Z`).toISOString();

export const transactionsApi = {
  getAll: async (filters: TransactionFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.startDate) params.set('createdAt_gte', toStartIso(filters.startDate));
    if (filters.endDate) params.set('createdAt_lte', toEndIso(filters.endDate));
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.customerId) params.set('customerId', filters.customerId);

    const query = params.toString();
    return (await api.get<Transaction[]>(`/transactions${query ? `?${query}` : ''}`)).data;
  },
  create: async (payload: Transaction) => (await api.post<Transaction>('/transactions', payload)).data,
  updateStatus: async (transaction: Transaction, status: TransactionStatus) => {
    return (await api.put<Transaction>(`/transactions/${transaction.id}`, {
      ...transaction,
      status,
    })).data;
  },
  verifyManualPaymentCredentials: async (
    customerId: string,
    credentials: ManualPaymentCredentials,
  ) => {
    const { data } = await api.get<User[]>('/users', {
      params: {
        customerId,
        password: credentials.password,
      },
    });
    const normalizedUsername = credentials.username.trim().toLowerCase();

    return data.some((user) => {
      const email = user.email.trim().toLowerCase();
      const name = user.name.trim().toLowerCase();

      return email === normalizedUsername || name === normalizedUsername;
    });
  },
};
