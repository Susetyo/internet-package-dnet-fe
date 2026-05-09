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
  packageId?: string;
};

const toStartIso = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString();
const toEndIso = (date: string) => new Date(`${date}T23:59:59.999Z`).toISOString();
const toTransactionPayload = (transaction: Transaction): Transaction => ({
  id: transaction.id,
  customerId: transaction.customerId,
  packageId: transaction.packageId,
  paymentMethod: transaction.paymentMethod,
  status: transaction.status,
  createdAt: transaction.createdAt,
  ...(transaction.paidAt ? { paidAt: transaction.paidAt } : {}),
  ...(transaction.manualPaymentProof
    ? { manualPaymentProof: transaction.manualPaymentProof }
    : {}),
});

export const transactionsApi = {
  getAll: async (filters: TransactionFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.startDate) params.set('createdAt_gte', toStartIso(filters.startDate));
    if (filters.endDate) params.set('createdAt_lte', toEndIso(filters.endDate));
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.customerId) params.set('customerId', filters.customerId);
    if (filters.packageId && filters.packageId !== 'all') params.set('packageId', filters.packageId);

    const query = params.toString();
    return (await api.get<Transaction[]>(`/transactions${query ? `?${query}` : ''}`)).data;
  },
  create: async (payload: Transaction) => (await api.post<Transaction>('/transactions', payload)).data,
  updateStatus: async (transaction: Transaction, status: TransactionStatus) => {
    return (await api.put<Transaction>(`/transactions/${transaction.id}`, {
      ...toTransactionPayload(transaction),
      status,
    })).data;
  },
  confirmManualPayment: async (
    transaction: Transaction,
    proof: { fileName: string; imageUrl: string },
  ) => {
    const now = new Date().toISOString();

    return (await api.put<Transaction>(`/transactions/${transaction.id}`, {
      ...toTransactionPayload(transaction),
      status: 'success',
      paidAt: now,
      manualPaymentProof: {
        ...proof,
        uploadedAt: now,
      },
    })).data;
  },
  verifyManualPaymentCredentials: async (
    credentials: ManualPaymentCredentials,
  ) => {
    const normalizedEmail = credentials.username.trim().toLowerCase();
    const { data } = await api.get<User[]>('/users', {
      params: {
        email: normalizedEmail,
      },
    });

    return data.some((user) => {
      const email = user.email.trim().toLowerCase();

      return (
        user.role === 'customer' &&
        email === normalizedEmail &&
        user.password === credentials.password
      );
    });
  },
};
