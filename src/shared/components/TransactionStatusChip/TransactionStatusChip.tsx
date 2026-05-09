import {
    CheckCircleRounded,
    ErrorRounded,
    PendingActionsRounded,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import type { ReactElement } from "react";
import type { TransactionStatus } from "../../../features/transactions/types/transaction.types";
import { transactionStatusColors, transactionStatusLabels } from "../../utils";

type TransactionStatusChipProps = {
    showIcon?: boolean;
    status: TransactionStatus;
};

const statusIcons: Record<TransactionStatus, ReactElement> = {
    pending: <PendingActionsRounded fontSize="small" />,
    success: <CheckCircleRounded fontSize="small" />,
    failed: <ErrorRounded fontSize="small" />,
};

export function TransactionStatusChip({
    showIcon,
    status,
}: TransactionStatusChipProps) {
    const colors = transactionStatusColors[status];

    return (
        <Chip
            icon={showIcon ? statusIcons[status] : undefined}
            label={transactionStatusLabels[status]}
            size="small"
            sx={{
                bgcolor: colors.bg,
                color: colors.fg,
                fontWeight: 900,
                "& .MuiChip-icon": {
                    color: colors.fg,
                },
            }}
        />
    );
}
