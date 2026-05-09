import { useQuery } from "@tanstack/react-query";
import { transactionsApi } from "../../features/transactions/api/transactions.api";
import type { TransactionStatus } from "../../features/transactions/types/transaction.types";

export type TransactionFilters = {
    startDate?: string;
    endDate?: string;
    status?: TransactionStatus | "all";
    customerId?: string;
};

export const transactionsQueryKey = ["transactions"] as const;

export function useTransactionsQuery(filters: TransactionFilters = {}) {
    return useQuery({
        queryKey: [
            ...transactionsQueryKey,
            filters.customerId,
            filters.startDate,
            filters.endDate,
            filters.status,
        ],
        queryFn: () => transactionsApi.getAll(filters),
        enabled: filters.customerId === undefined || Boolean(filters.customerId),
    });
}
