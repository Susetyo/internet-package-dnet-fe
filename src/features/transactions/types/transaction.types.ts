import type { InternetPackage } from "../../internet-packages/types/package.types";

export type TransactionStatus = 'pending' | 'success' | 'failed';
export type PaymentMethod = 'QRIS' | 'Virtual Account' | 'E-Wallet';

export type Transaction = {
    id: string;
    customerId: string;
    packageId: string;
    paymentMethod: PaymentMethod;
    status: TransactionStatus;
    createdAt: string;
    manualPaymentProof?: {
        fileName: string;
        imageUrl: string;
        uploadedAt: string;
    };
    paidAt?: string;
};

export type PendingCustomerTransaction = Transaction & {
    package?: InternetPackage;
};

export type ManualPaymentCredentials = {
    username: string;
    password: string;
};
