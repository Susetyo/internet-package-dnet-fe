import {
    AccountCircleRounded,
    CheckCircleRounded,
    ErrorRounded,
    FilterAltRounded,
    PendingActionsRounded,
    ReceiptLongRounded,
    RestartAltRounded,
    ShoppingCartRounded,
    WifiRounded,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { customersApi } from "../features/customers/api/customers.api";
import { packagesApi } from "../features/internet-packages/api/packages.api";
import { useAuthStore } from "../features/auth/store/auth.store";
import { transactionsApi } from "../features/transactions/api/transactions.api";
import type { TransactionStatus } from "../features/transactions/types/transaction.types";
import {
    DashboardCard,
    EmptyPanel,
    MetricCard,
    PackageRow,
    StatusProgress,
} from "../shared/components";
import {
    formatCurrency,
    formatDate,
    getDefaultDateRange,
} from "../shared/utils";

const statusLabels: Record<TransactionStatus, string> = {
    pending: "Menunggu",
    success: "Sukses",
    failed: "Gagal",
};

const statusColors: Record<TransactionStatus, { bg: string; fg: string }> = {
    pending: { bg: "rgba(246,196,0,0.16)", fg: "#f6d84f" },
    success: { bg: "rgba(140,198,63,0.16)", fg: "#b7f477" },
    failed: { bg: "rgba(255,95,134,0.16)", fg: "#ff9db3" },
};

export function CustomerDashboardPage() {
    const user = useAuthStore((state) => state.user);
    const customerId = user?.customerId;
    const [defaultRange] = useState(getDefaultDateRange);
    const [startDate, setStartDate] = useState(defaultRange.start);
    const [endDate, setEndDate] = useState(defaultRange.end);
    const [status, setStatus] = useState<TransactionStatus | "all">("all");

    const {
        data: customer,
        isLoading: isCustomerLoading,
        isError: isCustomerError,
    } = useQuery({
        queryKey: ["customer", customerId],
        queryFn: () => customersApi.getById(customerId ?? ""),
        enabled: Boolean(customerId),
    });
    const {
        data: packs = [],
        isLoading: isPackagesLoading,
        isError: isPackagesError,
    } = useQuery({
        queryKey: ["packages"],
        queryFn: packagesApi.getAll,
    });
    const {
        data: transactions = [],
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
        isFetching: isTransactionsFetching,
    } = useQuery({
        queryKey: ["transactions", customerId, startDate, endDate, status],
        queryFn: () =>
            transactionsApi.getAll({
                customerId,
                startDate,
                endDate,
                status,
            }),
        enabled: Boolean(customerId),
    });

    const packageById = useMemo(
        () => new Map(packs.map((pack) => [pack.id, pack])),
        [packs],
    );

    const successfulTransactions = transactions.filter(
        (tx) => tx.status === "success",
    );
    const pendingCount = transactions.filter((tx) => tx.status === "pending").length;
    const failedCount = transactions.filter((tx) => tx.status === "failed").length;
    const totalSpend = successfulTransactions.reduce((total, tx) => {
        const pack = packageById.get(tx.packageId);
        return total + (pack?.price ?? 0);
    }, 0);
    const latestSuccess = successfulTransactions[0];
    const activePackage = latestSuccess
        ? packageById.get(latestSuccess.packageId)
        : undefined;

    const usedPackages = useMemo(() => {
        const usage = new Map<string, number>();
        transactions.forEach((tx) => {
            usage.set(tx.packageId, (usage.get(tx.packageId) ?? 0) + 1);
        });

        return packs
            .filter((pack) => usage.has(pack.id))
            .map((pack) => ({
                ...pack,
                transactionCount: usage.get(pack.id) ?? 0,
            }))
            .sort((a, b) => b.transactionCount - a.transactionCount)
            .slice(0, 4);
    }, [packs, transactions]);

    const isLoading =
        isCustomerLoading || isPackagesLoading || isTransactionsLoading;
    const hasError = isCustomerError || isPackagesError || isTransactionsError;

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
            {hasError && (
                <Alert severity="error">
                    Gagal mengambil data customer dari json-server. Pastikan
                    `pnpm server` berjalan di port 3001.
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
                    Dashboard Customer
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Pantau paket aktif, pembelian, dan riwayat transaksi milik
                    akun Anda.
                </Typography>
            </Box>

            <DashboardCard>
                <Stack
                    direction={{ xs: "column", lg: "row" }}
                    sx={{
                        alignItems: { xs: "stretch", lg: "end" },
                        gap: 2,
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center", mb: 0.75 }}
                        >
                            <FilterAltRounded sx={{ color: "#f6c400" }} />
                            <Typography sx={sectionTitleSx}>
                                Filter Transaksi Saya
                            </Typography>
                        </Stack>
                        <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                            Filter hanya berlaku untuk transaksi yang terhubung
                            ke akun customer ini.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(160px, 1fr))",
                                lg: "180px 180px 170px auto",
                            },
                            gap: 1.5,
                        }}
                    >
                        <TextField
                            label="Tanggal Mulai"
                            type="date"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                            size="small"
                            sx={filterFieldSx}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                            label="Tanggal Akhir"
                            type="date"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                            size="small"
                            sx={filterFieldSx}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                            label="Status"
                            select
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value as TransactionStatus | "all")
                            }
                            size="small"
                            sx={filterFieldSx}
                        >
                            <MenuItem value="all">Semua Status</MenuItem>
                            <MenuItem value="pending">Menunggu</MenuItem>
                            <MenuItem value="success">Sukses</MenuItem>
                            <MenuItem value="failed">Gagal</MenuItem>
                        </TextField>
                        <Button
                            startIcon={<RestartAltRounded />}
                            disabled={isTransactionsFetching}
                            onClick={() => {
                                setStartDate(defaultRange.start);
                                setEndDate(defaultRange.end);
                                setStatus("all");
                            }}
                            sx={{
                                color: "#72d8ff",
                                fontWeight: 900,
                                textTransform: "none",
                            }}
                        >
                            Reset
                        </Button>
                    </Box>
                </Stack>
            </DashboardCard>

            {isLoading && (
                <DashboardCard>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                        <CircularProgress size={22} sx={{ color: "#72d8ff" }} />
                        <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                            Memuat data transaksi customer...
                        </Typography>
                    </Stack>
                </DashboardCard>
            )}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Profil Customer"
                        value={customer?.segment ?? "-"}
                        icon={<AccountCircleRounded />}
                        color="#00a9e8"
                        description={customer?.name ?? user?.name ?? "Customer"}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Paket Aktif"
                        value={activePackage?.name ?? "-"}
                        icon={<WifiRounded />}
                        color="#f6c400"
                        description={
                            activePackage
                                ? `${activePackage.validityDays} hari masa aktif`
                                : "Belum ada paket aktif"
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Transaksi Saya"
                        value={transactions.length}
                        icon={<ReceiptLongRounded />}
                        color="#8cc63f"
                        description="Sesuai filter tanggal"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Total Pembelian"
                        value={formatCurrency(totalSpend)}
                        icon={<ShoppingCartRounded />}
                        color="#72d8ff"
                        description="Hanya transaksi sukses"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 4 }}>
                    <DashboardCard>
                        <Typography sx={sectionTitleSx}>
                            Status Transaksi Saya
                        </Typography>
                        <Stack spacing={2.25} sx={{ mt: 2.5 }}>
                            <StatusProgress
                                label="Sukses"
                                count={successfulTransactions.length}
                                total={transactions.length}
                                color="#8cc63f"
                                icon={<CheckCircleRounded />}
                            />
                            <StatusProgress
                                label="Menunggu"
                                count={pendingCount}
                                total={transactions.length}
                                color="#f6c400"
                                icon={<PendingActionsRounded />}
                            />
                            <StatusProgress
                                label="Gagal"
                                count={failedCount}
                                total={transactions.length}
                                color="#ff5f86"
                                icon={<ErrorRounded />}
                            />
                        </Stack>
                    </DashboardCard>
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                    <DashboardCard>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            sx={{
                                alignItems: { xs: "flex-start", sm: "center" },
                                justifyContent: "space-between",
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <Typography sx={sectionTitleSx}>
                                Paket yang Pernah Dibeli
                            </Typography>
                            <Chip
                                icon={<WifiRounded />}
                                label={`${usedPackages.length} paket`}
                                sx={{
                                    bgcolor: "rgba(0,169,232,0.16)",
                                    color: "#72d8ff",
                                    fontWeight: 900,
                                }}
                            />
                        </Stack>
                        <Stack spacing={2}>
                            {usedPackages.length ? (
                                usedPackages.map((pack) => (
                                    <PackageRow
                                        key={pack.id}
                                        pack={pack}
                                        maxCount={Math.max(
                                            ...usedPackages.map(
                                                (item) => item.transactionCount,
                                            ),
                                            1,
                                        )}
                                    />
                                ))
                            ) : (
                                <EmptyPanel message="Belum ada paket yang dibeli pada filter ini." />
                            )}
                        </Stack>
                    </DashboardCard>
                </Grid>
            </Grid>

            <DashboardCard>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography sx={sectionTitleSx}>
                        Riwayat Transaksi Saya
                    </Typography>
                    <Chip
                        label={`${transactions.length} data`}
                        sx={{
                            bgcolor: "rgba(246,196,0,0.16)",
                            color: "#f6d84f",
                            fontWeight: 900,
                        }}
                    />
                </Stack>
                <TableContainer>
                    <Table sx={{ minWidth: 820 }}>
                        <TableHead>
                            <TableRow>
                                {[
                                    "ID Transaksi",
                                    "Paket",
                                    "Harga",
                                    "Metode",
                                    "Tanggal",
                                    "Status",
                                ].map((head) => (
                                    <TableCell key={head} sx={tableHeadSx}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((tx) => {
                                const pack = packageById.get(tx.packageId);
                                const colors = statusColors[tx.status];

                                return (
                                    <TableRow key={tx.id}>
                                        <TableCell sx={tableCellSx}>{tx.id}</TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {pack?.name ?? "Paket tidak ditemukan"}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {formatCurrency(pack?.price ?? 0)}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {tx.paymentMethod}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {formatDate(tx.createdAt)}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            <Chip
                                                label={statusLabels[tx.status]}
                                                size="small"
                                                sx={{
                                                    bgcolor: colors.bg,
                                                    color: colors.fg,
                                                    fontWeight: 900,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!transactions.length && (
                    <EmptyPanel message="Tidak ada transaksi pada filter tanggal ini." />
                )}
            </DashboardCard>
        </Stack>
    );
}

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
};

const filterFieldSx = {
    minWidth: 0,
    "& .MuiInputBase-root": {
        color: "#fff",
        bgcolor: "rgba(255,255,255,0.08)",
        borderRadius: 1,
        fontSize: 14,
    },
    "& .MuiInputLabel-root": {
        color: "rgba(255,255,255,0.62)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#72d8ff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.14)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(114,216,255,0.5)",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#72d8ff",
    },
    "& .MuiSvgIcon-root": {
        color: "rgba(255,255,255,0.7)",
    },
};

const tableHeadSx = {
    color: "rgba(255,255,255,0.72)",
    fontWeight: 900,
    borderColor: "rgba(255,255,255,0.1)",
};

const tableCellSx = {
    color: "rgba(255,255,255,0.86)",
    borderColor: "rgba(255,255,255,0.08)",
};
