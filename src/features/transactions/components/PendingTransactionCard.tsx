import {
    ConfirmationNumberRounded,
    PasswordRounded,
    QrCode2Rounded,
} from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { formatDate } from "../../../shared/utils/formatDate";
import type { PendingCustomerTransaction } from "../types/transaction.types";

type PendingTransactionCardProps = {
    transaction: PendingCustomerTransaction;
    onManualPayment: (transaction: PendingCustomerTransaction) => void;
    onShowQr: (transaction: PendingCustomerTransaction) => void;
};

export function PendingTransactionCard({
    transaction,
    onManualPayment,
    onShowQr,
}: PendingTransactionCardProps) {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                }}
            >
                <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
                    <Box
                        sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 1,
                            display: "grid",
                            placeItems: "center",
                            flex: "0 0 auto",
                            bgcolor: "rgba(246,196,0,0.16)",
                            color: "#f6c400",
                        }}
                    >
                        <ConfirmationNumberRounded />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 900,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {transaction.package?.name ?? transaction.packageId}
                        </Typography>
                        <Typography
                            sx={{ color: "rgba(255,255,255,0.62)", mt: 0.25 }}
                        >
                            {transaction.id} •{" "}
                            {formatDate(transaction.createdAt)}
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                >
                    <Chip
                        label={formatCurrency(transaction.package?.price ?? 0)}
                        sx={{
                            bgcolor: "rgba(114,216,255,0.16)",
                            color: "#72d8ff",
                            fontWeight: 900,
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<QrCode2Rounded />}
                        onClick={() => onShowQr(transaction)}
                        sx={{
                            borderColor: "rgba(255,255,255,0.24)",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: 800,
                        }}
                    >
                        QR
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<PasswordRounded />}
                        onClick={() => onManualPayment(transaction)}
                        sx={{
                            bgcolor: "#f6c400",
                            color: "#102331",
                            textTransform: "none",
                            fontWeight: 900,
                            "&:hover": { bgcolor: "#e5b600" },
                        }}
                    >
                        Manual Bayar
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
