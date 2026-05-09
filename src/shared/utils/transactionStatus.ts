import type { TransactionStatus } from "../../features/transactions/types/transaction.types";
import type { TransactionStatusColor } from "../types";

export const transactionStatusLabels: Record<TransactionStatus, string> = {
    pending: "Menunggu",
    success: "Sukses",
    failed: "Gagal",
};

export const transactionStatusColors: Record<
    TransactionStatus,
    TransactionStatusColor
> = {
    pending: { bg: "rgba(246,196,0,0.16)", fg: "#f6d84f" },
    success: { bg: "rgba(140,198,63,0.16)", fg: "#b7f477" },
    failed: { bg: "rgba(255,95,134,0.16)", fg: "#ff9db3" },
};
