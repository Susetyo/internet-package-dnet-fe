import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import type { PendingCustomerTransaction } from "../types/transaction.types";
import { PaymentQr } from "./PaymentQr";

type QrPaymentDialogProps = {
    open: boolean;
    transaction: PendingCustomerTransaction | null;
    onClose: () => void;
};

export function QrPaymentDialog({
    open,
    transaction,
    onClose,
}: QrPaymentDialogProps) {
    const qrValue = transaction
        ? `DNET|${transaction.id}|${transaction.customerId}|${transaction.packageId}|${transaction.package?.price ?? 0}`
        : "";

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ fontWeight: 900, color: "black" }}>
                QR Payment
            </DialogTitle>
            <DialogContent>
                {transaction && (
                    <Stack spacing={2.5}>
                        <PaymentQr value={qrValue} />
                        <Box sx={{ textAlign: "center" }}>
                            <Typography sx={{ fontWeight: 900 }}>
                                {transaction.package?.name ??
                                    transaction.packageId}
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mt: 0.5 }}
                            >
                                Invoice {transaction.id}
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 1.5,
                                borderRadius: 1,
                                bgcolor: "rgba(0,107,182,0.08)",
                            }}
                        >
                            <Typography sx={{ fontWeight: 800 }}>
                                Total Bayar
                            </Typography>
                            <Chip
                                label={formatCurrency(
                                    transaction.package?.price ?? 0,
                                )}
                                sx={{ fontWeight: 900 }}
                            />
                        </Stack>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ fontWeight: 800 }}
                >
                    Tutup
                </Button>
            </DialogActions>
        </Dialog>
    );
}
