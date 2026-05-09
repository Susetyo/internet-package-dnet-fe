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
import { useState } from "react";
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
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: "#fff",
                        color: "#102331",
                    },
                },
            }}
        >
            <DialogTitle sx={{ color: "#102331", fontWeight: 900 }}>
                Manual Bayar
            </DialogTitle>
            {open && (
                <ManualPaymentForm
                    errorMessage={errorMessage}
                    isSubmitting={isSubmitting}
                    transaction={transaction}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            )}
        </Dialog>
    );
}

function ManualPaymentForm({
    errorMessage,
    isSubmitting,
    transaction,
    onClose,
    onSubmit,
}: Omit<ManualPaymentDialogProps, "open">) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
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
                        sx={paymentFieldSx}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        sx={paymentFieldSx}
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
        </>
    );
}

const paymentFieldSx = {
    "& .MuiInputBase-root": {
        bgcolor: "#fff",
        color: "#102331",
        borderRadius: 1.25,
    },
    "& .MuiInputLabel-root": {
        color: "#526476",
        fontWeight: 700,
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#006bb6",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#c9d4df",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8aa0b5",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#006bb6",
        borderWidth: 2,
    },
    "& input": {
        color: "#102331",
    },
    "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #fff inset",
        WebkitTextFillColor: "#102331",
        caretColor: "#102331",
        borderRadius: 1.25,
    },
    "& input:-webkit-autofill:hover": {
        WebkitBoxShadow: "0 0 0 1000px #fff inset",
        WebkitTextFillColor: "#102331",
    },
    "& input:-webkit-autofill:focus": {
        WebkitBoxShadow: "0 0 0 1000px #fff inset",
        WebkitTextFillColor: "#102331",
    },
};
