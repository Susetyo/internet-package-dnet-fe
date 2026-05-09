import type { TransactionStatus } from "../../features/transactions/types/transaction.types";

export type TransactionStatusFilter = TransactionStatus | "all";

export type TransactionStatusColor = {
    bg: string;
    fg: string;
};
