import { Alert, Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import {
    useCustomersQuery,
    usePackagesQuery,
    useTransactionsQuery,
} from "../../../shared/hooks";
import { useAuthStore } from "../../auth/store/auth.store";
import {
    HistoryTransactionFilters,
    HistoryTransactionTable,
} from "../components";
import { useHistoryTransactionFilters } from "../hooks";

type HistoryTransactionsPageProps = {
    adminOnly?: boolean;
};

export function HistoryTransactionsPage({
    adminOnly = false,
}: HistoryTransactionsPageProps) {
    const user = useAuthStore((state) => state.user);
    const isAdminHistory = adminOnly || user?.role === "admin";
    const customerId = isAdminHistory ? undefined : user?.customerId;
    const { filters, pagination, actions } = useHistoryTransactionFilters();

    const {
        data: customers = [],
        isLoading: isCustomersLoading,
        isError: isCustomersError,
    } = useCustomersQuery();
    const {
        data: packages = [],
        isLoading: isPackagesLoading,
        isError: isPackagesError,
    } = usePackagesQuery();
    const {
        data: transactions = [],
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
        isFetching: isTransactionsFetching,
    } = useTransactionsQuery({
        ...filters,
        customerId:
            filters.customerId !== "all" ? filters.customerId : customerId,
    });

    const customerById = useMemo(
        () => new Map(customers.map((customer) => [customer.id, customer])),
        [customers],
    );
    const packageById = useMemo(
        () => new Map(packages.map((pack) => [pack.id, pack])),
        [packages],
    );

    const sortedTransactions = useMemo(
        () =>
            [...transactions].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            ),
        [transactions],
    );

    const totalSuccessSpend = sortedTransactions.reduce((total, transaction) => {
        if (transaction.status !== "success") return total;

        return total + (packageById.get(transaction.packageId)?.price ?? 0);
    }, 0);

    const isLoading =
        isPackagesLoading || isTransactionsLoading || isCustomersLoading;
    const hasError = isPackagesError || isTransactionsError || isCustomersError;

    if (adminOnly && user?.role !== "admin") {
        return (
            <Alert severity="error">
                Halaman riwayat transaksi admin hanya bisa diakses oleh role
                admin.
            </Alert>
        );
    }

    if (!isAdminHistory && !customerId) {
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
                    Gagal mengambil riwayat transaksi. Pastikan `pnpm server`
                    berjalan di port 3001.
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
                    {isAdminHistory
                        ? "Riwayat Transaksi Customer"
                        : "Riwayat Transaksi"}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    {isAdminHistory
                        ? "Semua transaksi customer, lengkap dengan filter tanggal, customer, status, dan pagination."
                        : "Semua transaksi dari customer yang sedang login, lengkap dengan filter paket, tanggal, dan status."}
                </Typography>
            </Box>

            <HistoryTransactionFilters
                customers={customers}
                packages={packages}
                customerId={filters.customerId}
                packageId={filters.packageId}
                startDate={filters.startDate}
                endDate={filters.endDate}
                status={filters.status}
                showCustomerFilter={isAdminHistory}
                isResetDisabled={isTransactionsFetching}
                onCustomerIdChange={actions.updateCustomerId}
                onPackageIdChange={actions.updatePackageId}
                onStartDateChange={actions.updateStartDate}
                onEndDateChange={actions.updateEndDate}
                onStatusChange={actions.updateStatus}
                onReset={actions.resetFilters}
            />

            <HistoryTransactionTable
                transactions={sortedTransactions}
                customerById={isAdminHistory ? customerById : undefined}
                packageById={packageById}
                totalSuccessSpend={totalSuccessSpend}
                isLoading={isLoading}
                title={
                    isAdminHistory
                        ? "Daftar Transaksi Customer"
                        : "Daftar Transaksi Saya"
                }
                page={pagination.page}
                rowsPerPage={pagination.rowsPerPage}
                onPageChange={actions.setPage}
                onRowsPerPageChange={actions.updateRowsPerPage}
            />
        </Stack>
    );
}
