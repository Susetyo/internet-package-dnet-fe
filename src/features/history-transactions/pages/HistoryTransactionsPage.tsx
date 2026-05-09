import { Alert, Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { usePackagesQuery, useTransactionsQuery } from "../../../shared/hooks";
import { useAuthStore } from "../../auth/store/auth.store";
import {
    HistoryTransactionFilters,
    HistoryTransactionTable,
} from "../components";
import { useHistoryTransactionFilters } from "../hooks";

export function HistoryTransactionsPage() {
    const user = useAuthStore((state) => state.user);
    const customerId = user?.customerId;
    const { filters, pagination, actions } = useHistoryTransactionFilters();

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
        customerId,
        ...filters,
    });

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

    const isLoading = isPackagesLoading || isTransactionsLoading;
    const hasError = isPackagesError || isTransactionsError;

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
                    Riwayat Transaksi
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Semua transaksi dari customer yang sedang login, lengkap
                    dengan filter paket, tanggal, dan status.
                </Typography>
            </Box>

            <HistoryTransactionFilters
                packages={packages}
                packageId={filters.packageId}
                startDate={filters.startDate}
                endDate={filters.endDate}
                status={filters.status}
                isResetDisabled={isTransactionsFetching}
                onPackageIdChange={actions.updatePackageId}
                onStartDateChange={actions.updateStartDate}
                onEndDateChange={actions.updateEndDate}
                onStatusChange={actions.updateStatus}
                onReset={actions.resetFilters}
            />

            <HistoryTransactionTable
                transactions={sortedTransactions}
                packageById={packageById}
                totalSuccessSpend={totalSuccessSpend}
                isLoading={isLoading}
                page={pagination.page}
                rowsPerPage={pagination.rowsPerPage}
                onPageChange={actions.setPage}
                onRowsPerPageChange={actions.updateRowsPerPage}
            />
        </Stack>
    );
}
