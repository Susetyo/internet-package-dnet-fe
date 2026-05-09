import {
    CheckCircleRounded,
    ErrorRounded,
    HistoryRounded,
    PendingActionsRounded,
} from "@mui/icons-material";
import {
    Box,
    Chip,
    CircularProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import type { ReactElement } from "react";
import { DashboardCard, EmptyPanel } from "../../../shared/components";
import { formatCurrency, formatDate } from "../../../shared/utils";
import type { TransactionStatus } from "../../transactions/types/transaction.types";
import type { HistoryTransactionTableProps } from "../types";

const statusLabels: Record<TransactionStatus, string> = {
    pending: "Menunggu",
    success: "Sukses",
    failed: "Gagal",
};

const statusColors: Record<
    TransactionStatus,
    { bg: string; fg: string; icon: ReactElement }
> = {
    pending: {
        bg: "rgba(246,196,0,0.16)",
        fg: "#f6d84f",
        icon: <PendingActionsRounded fontSize="small" />,
    },
    success: {
        bg: "rgba(140,198,63,0.16)",
        fg: "#b7f477",
        icon: <CheckCircleRounded fontSize="small" />,
    },
    failed: {
        bg: "rgba(255,95,134,0.16)",
        fg: "#ff9db3",
        icon: <ErrorRounded fontSize="small" />,
    },
};

export function HistoryTransactionTable({
    transactions,
    packageById,
    totalSuccessSpend,
    isLoading,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}: HistoryTransactionTableProps) {
    const paginatedTransactions = transactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    return (
        <DashboardCard>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 1.5,
                    mb: 2,
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
                        <HistoryRounded />
                    </Box>
                    <Box>
                        <Typography sx={sectionTitleSx}>
                            Daftar Transaksi Saya
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                            Total transaksi sukses: {formatCurrency(totalSuccessSpend)}
                        </Typography>
                    </Box>
                </Stack>
                <Chip
                    label={`${transactions.length} transaksi`}
                    sx={{
                        bgcolor: "rgba(246,196,0,0.16)",
                        color: "#f6d84f",
                        fontWeight: 900,
                    }}
                />
            </Stack>

            {isLoading ? (
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "center", justifyContent: "center", py: 5 }}
                >
                    <CircularProgress size={22} sx={{ color: "#72d8ff" }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                        Memuat riwayat transaksi...
                    </Typography>
                </Stack>
            ) : transactions.length ? (
                <TableContainer>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                {[
                                    "ID Transaksi",
                                    "Paket",
                                    "Provider",
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
                            {paginatedTransactions.map((transaction) => {
                                const pack = packageById.get(transaction.packageId);
                                const colors = statusColors[transaction.status];

                                return (
                                    <TableRow key={transaction.id}>
                                        <TableCell sx={tableCellSx}>
                                            {transaction.id}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            <Typography
                                                sx={{ fontWeight: 900, fontSize: 14 }}
                                            >
                                                {pack?.name ?? "Paket tidak ditemukan"}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgba(255,255,255,0.56)",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {pack ? `${pack.validityDays} hari` : "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {pack?.provider ?? "-"}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {formatCurrency(pack?.price ?? 0)}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {transaction.paymentMethod}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            {formatDate(transaction.createdAt)}
                                        </TableCell>
                                        <TableCell sx={tableCellSx}>
                                            <Chip
                                                icon={colors.icon}
                                                label={statusLabels[transaction.status]}
                                                size="small"
                                                sx={{
                                                    bgcolor: colors.bg,
                                                    color: colors.fg,
                                                    fontWeight: 900,
                                                    "& .MuiChip-icon": {
                                                        color: colors.fg,
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={transactions.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Baris per halaman"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} dari ${count}`
                        }
                        onPageChange={(_, nextPage) => onPageChange(nextPage)}
                        onRowsPerPageChange={(event) =>
                            onRowsPerPageChange(Number(event.target.value))
                        }
                        sx={paginationSx}
                    />
                </TableContainer>
            ) : (
                <EmptyPanel message="Tidak ada transaksi yang sesuai dengan filter." />
            )}
        </DashboardCard>
    );
}

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
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

const paginationSx = {
    color: "rgba(255,255,255,0.78)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    "& .MuiTablePagination-toolbar": {
        px: 0,
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
        m: 0,
        fontWeight: 800,
    },
    "& .MuiTablePagination-select, & .MuiTablePagination-actions button": {
        color: "#fff",
    },
    "& .MuiSvgIcon-root": {
        color: "rgba(255,255,255,0.78)",
    },
};
