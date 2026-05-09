import { ReceiptLongRounded } from "@mui/icons-material";
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { DashboardCard, EmptyPanel } from "../../../shared/components";
import { usePackagesQuery, useTransactionsQuery } from "../../../shared/hooks";
import { useAuthStore } from "../../auth/store/auth.store";
import {
    ManualPaymentDialog,
    PendingTransactionCard,
    QrPaymentDialog,
} from "../components";
import { useManualPaymentMutation } from "../hooks";
import type {
    PendingCustomerTransaction,
} from "../types/transaction.types";

export function CustomerTransactionsPage() {
    const user = useAuthStore((state) => state.user);
    const customerId = user?.customerId;
    const [qrTransaction, setQrTransaction] =
        useState<PendingCustomerTransaction | null>(null);
    const [manualTransaction, setManualTransaction] =
        useState<PendingCustomerTransaction | null>(null);
    const [manualPaymentError, setManualPaymentError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        data: transactions = [],
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
    } = useTransactionsQuery({ customerId, status: "pending" });

    const { data: packs = [], isLoading: isPackagesLoading } =
        usePackagesQuery();

    const packageById = useMemo(
        () => new Map(packs.map((pack) => [pack.id, pack])),
        [packs],
    );

    const pendingTransactions = useMemo<PendingCustomerTransaction[]>(
        () =>
            transactions.map((transaction) => ({
                ...transaction,
                package: packageById.get(transaction.packageId),
            })),
        [packageById, transactions],
    );

    const manualPaymentMutation = useManualPaymentMutation({
        customerId,
        transaction: manualTransaction,
        onMutate: () => {
            setManualPaymentError("");
            setSuccessMessage("");
        },
        onSuccess: (transaction) => {
            const packageName =
                packageById.get(transaction.packageId)?.name ?? "Paket internet";

            setSuccessMessage(
                `${packageName} berhasil dibayar. Pembelian paket internet berhasil.`,
            );
            setManualTransaction(null);
        },
        onError: (error) => {
            setManualPaymentError(error.message);
        },
    });

    if (!customerId) {
        return (
            <Alert severity="error">
                Akun customer belum memiliki `customerId`. Hubungi admin untuk
                menghubungkan akun dengan data customer.
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {isTransactionsError && (
                <Alert severity="error">
                    Gagal mengambil data transaksi. Pastikan `pnpm server`
                    berjalan di port 3001.
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage("")}>
                    {successMessage}
                </Alert>
            )}

            <Box>
                <Typography
                    component="h1"
                    sx={{
                        color: "#fff",
                        fontSize: { xs: 24, md: 28 },
                        fontWeight: 900,
                        letterSpacing: 0,
                        m: 0,
                    }}
                >
                    Transaksi Menunggu
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Semua transaksi pending dari akun customer yang sedang login.
                </Typography>
            </Box>

            <DashboardCard>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1.5,
                                display: "grid",
                                placeItems: "center",
                                bgcolor: "rgba(114,216,255,0.16)",
                                color: "#72d8ff",
                            }}
                        >
                            <ReceiptLongRounded />
                        </Box>
                        <Box>
                            <Typography sx={sectionTitleSx}>
                                Invoice Belum Dibayar
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                                Gunakan QR payment atau konfirmasi manual untuk
                                menyelesaikan pembayaran.
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={`${pendingTransactions.length} menunggu`}
                        sx={{
                            bgcolor: "rgba(246,196,0,0.16)",
                            color: "#f6c400",
                            fontWeight: 900,
                        }}
                    />
                </Stack>
            </DashboardCard>

            <DashboardCard>
                {isTransactionsLoading || isPackagesLoading ? (
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                        <CircularProgress size={22} sx={{ color: "#72d8ff" }} />
                        <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                            Memuat transaksi...
                        </Typography>
                    </Stack>
                ) : pendingTransactions.length ? (
                    <Stack spacing={1.5}>
                        {pendingTransactions.map((transaction) => (
                            <PendingTransactionCard
                                key={transaction.id}
                                transaction={transaction}
                                onShowQr={setQrTransaction}
                                onManualPayment={(selectedTransaction) => {
                                    setManualPaymentError("");
                                    setManualTransaction(selectedTransaction);
                                }}
                            />
                        ))}
                    </Stack>
                ) : (
                    <EmptyPanel message="Tidak ada transaksi yang sedang menunggu pembayaran." />
                )}
            </DashboardCard>

            <QrPaymentDialog
                open={Boolean(qrTransaction)}
                transaction={qrTransaction}
                onClose={() => setQrTransaction(null)}
            />
            <ManualPaymentDialog
                errorMessage={manualPaymentError}
                isSubmitting={manualPaymentMutation.isPending}
                open={Boolean(manualTransaction)}
                transaction={manualTransaction}
                onClose={() => {
                    if (!manualPaymentMutation.isPending) {
                        setManualTransaction(null);
                    }
                }}
                onSubmit={(credentials) => manualPaymentMutation.mutate(credentials)}
            />
        </Stack>
    );
}

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
};
