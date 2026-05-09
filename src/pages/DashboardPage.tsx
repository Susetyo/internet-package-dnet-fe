import {
    CheckCircleRounded,
    ErrorRounded,
    FilterAltRounded,
    GroupsRounded,
    Inventory2Rounded,
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
import { useMemo, useState } from "react";
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
import {
    useCustomersQuery,
    usePackagesQuery,
    useTransactionsQuery,
} from "../shared/hooks";

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

export function DashboardPage() {
    const [defaultRange] = useState(getDefaultDateRange);
    const [startDate, setStartDate] = useState(defaultRange.start);
    const [endDate, setEndDate] = useState(defaultRange.end);
    const [status, setStatus] = useState<TransactionStatus | "all">("all");

    const {
        data: customers = [],
        isLoading: isCustomersLoading,
        isError: isCustomersError,
    } = useCustomersQuery();
    const {
        data: packs = [],
        isLoading: isPackagesLoading,
        isError: isPackagesError,
    } = usePackagesQuery();
    const {
        data: filteredTransactions = [],
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
        isFetching: isTransactionsFetching,
    } = useTransactionsQuery({ startDate, endDate, status });

    const packageById = useMemo(
        () => new Map(packs.map((pack) => [pack.id, pack])),
        [packs],
    );
    const customerById = useMemo(
        () => new Map(customers.map((customer) => [customer.id, customer])),
        [customers],
    );

    const isLoading =
        isCustomersLoading || isPackagesLoading || isTransactionsLoading;
    const hasError = isCustomersError || isPackagesError || isTransactionsError;

    const totalRevenue = filteredTransactions.reduce((total, tx) => {
        const pack = packageById.get(tx.packageId);
        return total + (pack?.price ?? 0);
    }, 0);

    const successCount = filteredTransactions.filter(
        (tx) => tx.status === "success",
    ).length;
    const pendingCount = filteredTransactions.filter(
        (tx) => tx.status === "pending",
    ).length;
    const failedCount = filteredTransactions.filter(
        (tx) => tx.status === "failed",
    ).length;

    const bestPackages = useMemo(() => {
        const usage = new Map<string, number>();
        filteredTransactions.forEach((tx) => {
            usage.set(tx.packageId, (usage.get(tx.packageId) ?? 0) + 1);
        });

        return packs
            .map((pack) => ({
                ...pack,
                transactionCount: usage.get(pack.id) ?? 0,
            }))
            .sort((a, b) => b.transactionCount - a.transactionCount)
            .slice(0, 4);
    }, [filteredTransactions, packs]);

    return (
        <Stack spacing={3}>
            {hasError && (
                <Alert severity="error">
                    Gagal mengambil data dari json-server. Pastikan `pnpm
                    server` berjalan di port 3001.
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
                    Admin Dashboard
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Pantau semua customer, paket internet, dan transaksi
                    pembelian berdasarkan rentang tanggal.
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
                                Filter Transaksi
                            </Typography>
                        </Stack>
                        <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                            Filter berlaku untuk ringkasan transaksi, revenue,
                            paket terjual, dan tabel riwayat.
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
                            onChange={(event) =>
                                setStartDate(event.target.value)
                            }
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
                                setStatus(
                                    event.target.value as
                                        | TransactionStatus
                                        | "all",
                                )
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
                            Memuat data dashboard dari json-server...
                        </Typography>
                    </Stack>
                </DashboardCard>
            )}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Total Customer"
                        value={customers.length}
                        icon={<GroupsRounded />}
                        color="#00a9e8"
                        description="Semua customer terdaftar"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Total Paket"
                        value={packs.length}
                        icon={<Inventory2Rounded />}
                        color="#f6c400"
                        description="Paket internet aktif"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Transaksi Terfilter"
                        value={filteredTransactions.length}
                        icon={<ReceiptLongRounded />}
                        color="#8cc63f"
                        description="Dalam rentang tanggal"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                    <MetricCard
                        label="Total Revenue"
                        value={formatCurrency(totalRevenue)}
                        icon={<ShoppingCartRounded />}
                        color="#72d8ff"
                        description="Estimasi nilai pembelian"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 4 }}>
                    <DashboardCard>
                        <Typography sx={sectionTitleSx}>
                            Status Transaksi Customer
                        </Typography>
                        <Stack spacing={2.25} sx={{ mt: 2.5 }}>
                            <StatusProgress
                                label="Sukses"
                                count={successCount}
                                total={filteredTransactions.length}
                                color="#8cc63f"
                                icon={<CheckCircleRounded />}
                            />
                            <StatusProgress
                                label="Menunggu"
                                count={pendingCount}
                                total={filteredTransactions.length}
                                color="#f6c400"
                                icon={<PendingActionsRounded />}
                            />
                            <StatusProgress
                                label="Gagal"
                                count={failedCount}
                                total={filteredTransactions.length}
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
                                Semua Paket Internet
                            </Typography>
                            <Chip
                                icon={<WifiRounded />}
                                label={`${packs.length} paket tersedia`}
                                sx={{
                                    bgcolor: "rgba(0,169,232,0.16)",
                                    color: "#72d8ff",
                                    fontWeight: 900,
                                }}
                            />
                        </Stack>
                        <Stack spacing={2}>
                            {bestPackages.length ? (
                                bestPackages.map((pack) => (
                                    <PackageRow
                                        key={pack.id}
                                        pack={pack}
                                        maxCount={Math.max(
                                            ...bestPackages.map(
                                                (item) => item.transactionCount,
                                            ),
                                            1,
                                        )}
                                    />
                                ))
                            ) : (
                                <EmptyPanel message="Belum ada paket internet." />
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
                        Semua Transaksi Customer
                    </Typography>
                    <Chip
                        label={`${filteredTransactions.length} data`}
                        sx={{
                            bgcolor: "rgba(246,196,0,0.16)",
                            color: "#f6d84f",
                            fontWeight: 900,
                        }}
                    />
                </Stack>
                <TableContainer>
                    <Table sx={{ minWidth: 920 }}>
                        <TableHead>
                            <TableRow>
                                {[
                                    "ID Transaksi",
                                    "Customer",
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
                            {filteredTransactions.map((tx) => {
                                const customer = customerById.get(
                                    tx.customerId,
                                );
                                const pack = packageById.get(tx.packageId);
                                const colors = statusColors[tx.status];

                                return (
                                    <TableRow key={tx.id}>
                                        <TableCell sx={tableCellSx}>
                                            {tx.id}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {customer?.name ??
                                                "Customer tidak ditemukan"}
                                            <Typography
                                                sx={{
                                                    color: "rgba(255,255,255,0.46)",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {customer?.phone ?? "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {pack?.name ??
                                                "Paket tidak ditemukan"}
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
                {!filteredTransactions.length && (
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
