import { FilterAltRounded, RestartAltRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DashboardCard } from "../../../shared/components";
import type {
    HistoryTransactionFiltersProps,
    HistoryTransactionStatusFilter,
} from "../types";

export function HistoryTransactionFilters({
    customers,
    packages,
    customerId,
    packageId,
    startDate,
    endDate,
    status,
    showCustomerFilter = false,
    isResetDisabled,
    onCustomerIdChange,
    onPackageIdChange,
    onStartDateChange,
    onEndDateChange,
    onStatusChange,
    onReset,
}: HistoryTransactionFiltersProps) {
    return (
        <DashboardCard>
            <Stack spacing={2.5} sx={{ alignItems: "stretch" }}>
                <Box>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", mb: 0.75 }}
                    >
                        <FilterAltRounded sx={{ color: "#f6c400" }} />
                        <Typography sx={sectionTitleSx}>Filter Riwayat</Typography>
                    </Stack>
                    <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                        {showCustomerFilter
                            ? "Filter membaca semua transaksi customer."
                            : "Filter hanya membaca transaksi milik akun customer ini."}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(160px, 1fr))",
                            lg: showCustomerFilter
                                ? "minmax(240px, 1.35fr) minmax(200px, 1fr) repeat(3, minmax(150px, 1fr)) auto"
                                : "minmax(220px, 1.2fr) repeat(3, minmax(160px, 1fr)) auto",
                        },
                        alignItems: "end",
                        gap: 1.5,
                    }}
                >
                    {showCustomerFilter && (
                        <TextField
                            label="Customer"
                            select
                            value={customerId}
                            onChange={(event) =>
                                onCustomerIdChange(event.target.value)
                            }
                            size="small"
                            sx={filterFieldSx}
                        >
                            <MenuItem value="all">Semua Customer</MenuItem>
                            {customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name} - {customer.email}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    <TextField
                        label="Paket"
                        select
                        value={packageId}
                        onChange={(event) => onPackageIdChange(event.target.value)}
                        size="small"
                        sx={filterFieldSx}
                    >
                        <MenuItem value="all">Semua Paket</MenuItem>
                        {packages.map((pack) => (
                            <MenuItem key={pack.id} value={pack.id}>
                                {pack.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Tanggal Mulai"
                        type="date"
                        value={startDate}
                        onChange={(event) => onStartDateChange(event.target.value)}
                        size="small"
                        sx={filterFieldSx}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                        label="Tanggal Akhir"
                        type="date"
                        value={endDate}
                        onChange={(event) => onEndDateChange(event.target.value)}
                        size="small"
                        sx={filterFieldSx}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                        label="Status"
                        select
                        value={status}
                        onChange={(event) =>
                            onStatusChange(
                                event.target.value as HistoryTransactionStatusFilter,
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
                        disabled={isResetDisabled}
                        onClick={onReset}
                        sx={{
                            minHeight: 40,
                            px: 2,
                            color: "#72d8ff",
                            fontWeight: 900,
                            textTransform: "none",
                            justifyContent: { xs: "flex-start", lg: "center" },
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </Stack>
        </DashboardCard>
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
