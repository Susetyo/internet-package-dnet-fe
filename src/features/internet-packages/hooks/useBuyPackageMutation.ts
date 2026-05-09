import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsQueryKey } from "../../../shared/hooks";
import { transactionsApi } from "../../transactions/api/transactions.api";
import type { Transaction } from "../../transactions/types/transaction.types";
import type { InternetPackage } from "../types/package.types";

type UseBuyPackageMutationParams = {
    customerId?: string;
    onMutate?: (pack: InternetPackage) => void;
    onSuccess?: (pack: InternetPackage) => void;
    onSettled?: () => void;
};

export function useBuyPackageMutation({
    customerId,
    onMutate,
    onSuccess,
    onSettled,
}: UseBuyPackageMutationParams) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (pack: InternetPackage) => {
            const transaction: Transaction = {
                id: `trx-${Date.now()}`,
                customerId: customerId ?? "",
                packageId: pack.id,
                paymentMethod: "QRIS",
                status: "pending",
                createdAt: new Date().toISOString(),
            };

            return transactionsApi.create(transaction);
        },
        onMutate,
        onSuccess: (_transaction, pack) => {
            onSuccess?.(pack);
            queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
        },
        onSettled,
    });
}
