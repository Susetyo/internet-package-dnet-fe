import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsQueryKey } from "../../../shared/hooks";
import { transactionsApi } from "../api/transactions.api";
import type {
    ManualPaymentCredentials,
    PendingCustomerTransaction,
} from "../types/transaction.types";

type UseManualPaymentMutationParams = {
    customerId?: string;
    transaction: PendingCustomerTransaction | null;
    onMutate?: () => void;
    onSuccess?: (transaction: PendingCustomerTransaction) => void;
    onError?: (error: Error) => void;
};

export function useManualPaymentMutation({
    customerId,
    transaction,
    onMutate,
    onSuccess,
    onError,
}: UseManualPaymentMutationParams) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: ManualPaymentCredentials) => {
            if (!customerId || !transaction) {
                throw new Error("Transaksi tidak valid.");
            }

            const isVerified =
                await transactionsApi.verifyManualPaymentCredentials(
                    credentials,
                );

            if (!isVerified) {
                throw new Error("Username atau password tidak sesuai.");
            }

            return transactionsApi.updateStatus(transaction, "success");
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
