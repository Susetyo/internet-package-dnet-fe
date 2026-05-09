import { PeopleRounded } from "@mui/icons-material";
import { Box, Chip, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DashboardCard } from "../../../shared/components";
import type { AdminCustomerSelectorProps } from "../types/admin-buy-package.types";

export function AdminCustomerSelector({
    customers,
    selectedCustomer,
    selectedCustomerId,
    isLoading,
    onSelectCustomer,
}: AdminCustomerSelectorProps) {
    return (
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
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Box sx={iconBoxSx}>
                            <PeopleRounded />
                        </Box>
                        <Box>
                            <Typography sx={sectionTitleSx}>Data Customer</Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                                Pilih customer yang akan dibelikan paket internet.
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={`${customers.length} customer`}
                        sx={{
                            bgcolor: "rgba(114,216,255,0.16)",
                            color: "#72d8ff",
                            fontWeight: 900,
                        }}
                    />
                </Stack>

                <TextField
                    label="Customer"
                    select
                    value={selectedCustomerId}
                    onChange={(event) => onSelectCustomer(event.target.value)}
                    size="small"
                    disabled={isLoading}
                    sx={fieldSx}
                >
                    <MenuItem value="">Pilih customer</MenuItem>
                    {customers.map((customer) => (
                        <MenuItem
                            key={customer.id}
                            value={customer.id}
                            disabled={customer.status !== "active"}
                        >
                            {customer.name} - {customer.email}
                            {customer.status !== "active" ? " (inactive)" : ""}
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
