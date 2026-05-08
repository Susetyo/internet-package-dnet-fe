export type TransactionStatus = 'pending' | 'success' | 'failed';
export type Transaction = { id: string; customerId: string; packageId: string; paymentMethod: 'QRIS' | 'Virtual Account' | 'E-Wallet'; status: TransactionStatus; createdAt: string };
