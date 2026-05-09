import { FilterAltRounded, RestartAltRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { TransactionStatusFilter } from "../../types";
import { sectionTitleSx } from "../../utils";

type TransactionFiltersProps = {
    description: string;
    endDate: string;
    isResetDisabled?: boolean;
    onEndDateChange: (value: string) => void;
    onReset: () => void;
    onStartDateChange: (value: string) => void;
    onStatusChange: (value: TransactionStatusFilter) => void;
    startDate: string;
    status: TransactionStatusFilter;
    title: string;
};

export function TransactionFilters({
    description,
    endDate,
    isResetDisabled,
    onEndDateChange,
    onReset,
    onStartDateChange,
    onStatusChange,
    startDate,
    status,
    title,
}: TransactionFiltersProps) {
    return (
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
                    <Typography sx={sectionTitleSx}>{title}</Typography>
                </Stack>
                <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                    {description}
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
                        onStatusChange(event.target.value as TransactionStatusFilter)
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
                        color: "#72d8ff",
                        fontWeight: 900,
                        textTransform: "none",
                    }}
                >
                    Reset
                </Button>
            </Box>
        </Stack>
    );
}

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
