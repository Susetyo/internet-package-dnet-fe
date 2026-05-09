import {
    CheckCircleRounded,
    ConfirmationNumberRounded,
    PeopleRounded,
    ReceiptLongRounded,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
    DashboardCard,
    EmptyPanel,
    TransactionStatusChip,
} from "../../../shared/components";
import {
    useCustomersQuery,
    usePackagesQuery,
    useTransactionsQuery,
} from "../../../shared/hooks";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { formatDate } from "../../../shared/utils/formatDate";
import { useAuthStore } from "../../auth/store/auth.store";
import type { Customer } from "../../customers/types/customer.types";
import { AdminManualPaymentDialog } from "../components";
import { useAdminManualPaymentMutation } from "../hooks";
import type { PendingCustomerTransaction } from "../types/transaction.types";

type AdminTransaction = PendingCustomerTransaction & {
    customer?: Customer;
};

export function AdminTransactionsPage() {
    const user = useAuthStore((state) => state.user);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [manualTransaction, setManualTransaction] =
        useState<AdminTransaction | null>(null);
    const [manualPaymentError, setManualPaymentError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        data: customers = [],
        isLoading: isCustomersLoading,
        isError: isCustomersError,
    } = useCustomersQuery();
    const {
        data: transactions = [],
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
        isFetching: isTransactionsFetching,
    } = useTransactionsQuery({
        customerId: selectedCustomerId || undefined,
    });
    const {
        data: packs = [],
        isLoading: isPackagesLoading,
        isError: isPackagesError,
    } = usePackagesQuery();

    const customerById = useMemo(
        () => new Map(customers.map((customer) => [customer.id, customer])),
        [customers],
    );
    const packageById = useMemo(
        () => new Map(packs.map((pack) => [pack.id, pack])),
        [packs],
    );
    const selectedCustomer = selectedCustomerId
        ? customerById.get(selectedCustomerId)
        : undefined;
    const adminTransactions = useMemo<AdminTransaction[]>(
        () =>
            transactions.map((transaction) => ({
                ...transaction,
                customer: customerById.get(transaction.customerId),
                package: packageById.get(transaction.packageId),
            })),
        [customerById, packageById, transactions],
    );

    const manualPaymentMutation = useAdminManualPaymentMutation({
        transaction: manualTransaction,
        onMutate: () => {
            setManualPaymentError("");
            setSuccessMessage("");
        },
        onSuccess: (transaction) => {
            setSuccessMessage(
                `Invoice ${transaction.id} berhasil ditandai sukses.`,
            );
            setManualTransaction(null);
        },
        onError: (error) => {
            setManualPaymentError(error.message);
        },
    });

    if (user?.role !== "admin") {
        return (
            <Alert severity="error">
                Halaman transaksi admin hanya bisa diakses oleh role admin.
            </Alert>
        );
    }

    const pendingCount = adminTransactions.filter(
        (transaction) => transaction.status === "pending",
    ).length;
    const isLoading = isCustomersLoading || isTransactionsLoading || isPackagesLoading;
    const hasError = isCustomersError || isTransactionsError || isPackagesError;

    return (
        <Stack spacing={3}>
            {hasError && (
                <Alert severity="error">
                    Gagal mengambil data transaksi. Pastikan `pnpm server`
                    berjalan di port 3001.
                </Alert>
            )}
            {successMessage && (
                <Alert
                    icon={<CheckCircleRounded fontSize="inherit" />}
                    severity="success"
                    onClose={() => setSuccessMessage("")}
                >
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
                    Transaksi Admin
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Pilih customer tertentu atau tampilkan semua transaksi.
                </Typography>
            </Box>

            <DashboardCard>
                <Stack spacing={2.5}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        sx={{
                            alignItems: { xs: "flex-start", md: "center" },
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Box sx={iconBoxSx}>
                                <PeopleRounded />
                            </Box>
                            <Box>
                                <Typography sx={sectionTitleSx}>
                                    Filter Customer
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                                    Kosongkan pilihan untuk melihat semua customer.
                                </Typography>
                            </Box>
                        </Stack>
                        <Chip
                            label={`${adminTransactions.length} transaksi`}
                            sx={{
                                bgcolor: "rgba(246,196,0,0.16)",
                                color: "#f6c400",
                                fontWeight: 900,
                            }}
                        />
                    </Stack>

                    <TextField
                        label="Customer"
                        select
                        value={selectedCustomerId}
                        onChange={(event) => setSelectedCustomerId(event.target.value)}
                        size="small"
                        disabled={isCustomersLoading || isTransactionsFetching}
                        sx={fieldSx}
                    >
                        <MenuItem value="">Semua customer</MenuItem>
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.name} - {customer.email}
                            </MenuItem>
                        ))}
                    </TextField>

                    {selectedCustomer && (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(3, minmax(0, 1fr))",
                                },
                                gap: 1.25,
                            }}
                        >
                            <CustomerInfo label="Nama" value={selectedCustomer.name} />
                            <CustomerInfo label="Telepon" value={selectedCustomer.phone} />
                            <CustomerInfo label="Segment" value={selectedCustomer.segment} />
                        </Box>
                    )}
                </Stack>
            </DashboardCard>

            <DashboardCard>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Box sx={{ ...iconBoxSx, bgcolor: "rgba(114,216,255,0.16)", color: "#72d8ff" }}>
                            <ReceiptLongRounded />
                        </Box>
                        <Box>
                            <Typography sx={sectionTitleSx}>
                                Daftar Transaksi
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                                Admin dapat upload bukti untuk transaksi yang
                                masih menunggu pembayaran.
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={`${pendingCount} menunggu`}
                        sx={{
                            bgcolor: "rgba(246,196,0,0.16)",
                            color: "#f6c400",
                            fontWeight: 900,
                        }}
                    />
                </Stack>

                {isLoading ? (
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
                ) : adminTransactions.length ? (
                    <Stack spacing={1.5}>
                        {adminTransactions.map((transaction) => (
                            <AdminTransactionCard
                                key={transaction.id}
                                transaction={transaction}
                                onManualPayment={(selectedTransaction) => {
                                    setManualPaymentError("");
                                    setManualTransaction(selectedTransaction);
                                }}
                            />
                        ))}
                    </Stack>
                ) : (
                    <EmptyPanel message="Tidak ada transaksi pada filter ini." />
                )}
            </DashboardCard>

            <AdminManualPaymentDialog
                errorMessage={manualPaymentError}
                isSubmitting={manualPaymentMutation.isPending}
                open={Boolean(manualTransaction)}
                transaction={manualTransaction}
                onClose={() => {
                    if (!manualPaymentMutation.isPending) {
                        setManualTransaction(null);
                    }
                }}
                onSubmit={(payload) => manualPaymentMutation.mutate(payload)}
            />
        </Stack>
    );
}

function AdminTransactionCard({
    transaction,
    onManualPayment,
}: {
    transaction: AdminTransaction;
    onManualPayment: (transaction: AdminTransaction) => void;
}) {
    return (
        <Box
            sx={{
                p: { xs: 2, md: 2.5 },
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
                <Stack
                    direction="row"
                    spacing={{ xs: 1.5, md: 2 }}
                    sx={{ minWidth: 0, flex: 1, alignItems: "center" }}
                >
                    <Box
                        sx={{
                            width: { xs: 46, md: 56 },
                            height: { xs: 46, md: 56 },
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
                            sx={{
                                color: "rgba(255,255,255,0.62)",
                                mt: 0.25,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {transaction.customer?.name ?? "Customer tidak ditemukan"} -{" "}
                            {transaction.id}
                        </Typography>
                        <Typography
                            sx={{ color: "rgba(255,255,255,0.52)", fontSize: 13, mt: 0.25 }}
                        >
                            {formatDate(transaction.createdAt)} -{" "}
                            {transaction.paymentMethod}
                        </Typography>
                    </Box>
                </Stack>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr 1fr",
                            md: "max-content max-content",
                        },
                        gap: 1,
                        alignItems: "center",
                        justifyContent: { xs: "stretch", md: "end" },
                        width: { xs: "100%", md: "auto" },
                    }}
                >
                    <TransactionStatusChip showIcon status={transaction.status} />
                    <Chip
                        label={formatCurrency(transaction.package?.price ?? 0)}
                        sx={{
                            bgcolor: "rgba(114,216,255,0.16)",
                            color: "#72d8ff",
                            fontWeight: 900,
                            minWidth: { md: 150 },
                        }}
                    />
                    {transaction.status === "pending" && (
                        <Button
                            variant="contained"
                            startIcon={<CheckCircleRounded />}
                            onClick={() => onManualPayment(transaction)}
                            sx={{
                                bgcolor: "#f6c400",
                                color: "#102331",
                                textTransform: "none",
                                fontWeight: 900,
                                gridColumn: "1 / -1",
                                justifySelf: "stretch",
                                "&:hover": { bgcolor: "#e5b600" },
                            }}
                        >
                            Manual Pembayaran
                        </Button>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}

function CustomerInfo({ label, value }: { label: string; value: string }) {
    return (
        <Box
            sx={{
                borderRadius: 1,
                border: "1px solid rgba(255,255,255,0.1)",
                bgcolor: "rgba(255,255,255,0.06)",
                px: 1.5,
                py: 1.25,
            }}
        >
            <Typography sx={{ color: "rgba(255,255,255,0.54)", fontSize: 12 }}>
                {label}
            </Typography>
            <Typography sx={{ color: "#fff", fontWeight: 900, mt: 0.25 }}>
                {value}
            </Typography>
        </Box>
    );
}

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
};

const fieldSx = {
    maxWidth: 720,
    "& .MuiInputBase-root": {
        color: "#fff",
        bgcolor: "rgba(255,255,255,0.08)",
        borderRadius: 1,
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.62)" },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.12)",
    },
    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.72)" },
};

const iconBoxSx = {
    width: 48,
    height: 48,
    borderRadius: 1.5,
    display: "grid",
    placeItems: "center",
    bgcolor: "rgba(246,196,0,0.16)",
    color: "#f6c400",
};
