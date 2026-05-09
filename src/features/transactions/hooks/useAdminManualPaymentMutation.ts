import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsQueryKey } from "../../../shared/hooks";
import { transactionsApi } from "../api/transactions.api";
import type { PendingCustomerTransaction } from "../types/transaction.types";

type AdminManualPaymentPayload = {
    fileName: string;
    imageUrl: string;
};

type UseAdminManualPaymentMutationParams = {
    transaction: PendingCustomerTransaction | null;
    onMutate?: () => void;
    onSuccess?: (transaction: PendingCustomerTransaction) => void;
    onError?: (error: Error) => void;
};

export function useAdminManualPaymentMutation({
    transaction,
    onMutate,
    onSuccess,
    onError,
}: UseAdminManualPaymentMutationParams) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: AdminManualPaymentPayload) => {
            if (!transaction) {
                throw new Error("Transaksi tidak valid.");
            }

            return transactionsApi.confirmManualPayment(transaction, payload);
        },
        onMutate,
        onSuccess: (paidTransaction) => {
            onSuccess?.(paidTransaction);
            queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
        },
        onError: (error) => {
            onError?.(
                error instanceof Error
                    ? error
                    : new Error("Pembayaran manual gagal diproses."),
            );
        },
    });
}
