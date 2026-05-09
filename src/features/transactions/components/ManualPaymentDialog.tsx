import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type {
    ManualPaymentCredentials,
    PendingCustomerTransaction,
} from "../types/transaction.types";

type ManualPaymentDialogProps = {
    errorMessage: string;
    isSubmitting: boolean;
    open: boolean;
    transaction: PendingCustomerTransaction | null;
    onClose: () => void;
    onSubmit: (credentials: ManualPaymentCredentials) => void;
};

export function ManualPaymentDialog({
    errorMessage,
    isSubmitting,
    open,
    transaction,
    onClose,
    onSubmit,
}: ManualPaymentDialogProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!open) {
            setUsername("");
            setPassword("");
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ fontWeight: 900 }}>Manual Bayar</DialogTitle>
            <DialogContent>
                <Stack
                    component="form"
                    id="manual-payment-form"
                    spacing={2}
                    sx={{ pt: 1 }}
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit({ username, password });
                    }}
                >
                    {errorMessage && (
                        <Alert severity="error">{errorMessage}</Alert>
                    )}
                    {transaction && (
                        <Alert severity="info">
                            Konfirmasi pembayaran untuk invoice {transaction.id}
                            .
                        </Alert>
                    )}
                    <TextField
                        label="Username atau email"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoFocus
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button onClick={onClose} disabled={isSubmitting}>
                    Batal
                </Button>
                <Button
                    type="submit"
                    form="manual-payment-form"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ fontWeight: 800 }}
                >
                    {isSubmitting ? "Memproses..." : "Konfirmasi Bayar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
