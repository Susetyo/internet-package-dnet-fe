import { ShoppingCartRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { DashboardCard } from "../../../shared/components";
import type { AdminBuyPackageSubmitProps } from "../types/admin-buy-package.types";

export function AdminBuyPackageSubmit({
    canSubmit,
    isPending,
    onSubmit,
}: AdminBuyPackageSubmitProps) {
    return (
        <DashboardCard>
            <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{
                    alignItems: { xs: "stretch", md: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <ShoppingCartRounded sx={{ color: "#f6c400" }} />
                        <Typography sx={sectionTitleSx}>Submit Pembelian</Typography>
                    </Stack>
                    <Typography sx={{ color: "rgba(255,255,255,0.62)", mt: 0.75 }}>
                        Transaksi akan dibuat dengan status menunggu dan metode
                        pembayaran QRIS.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={
                        isPending ? (
                            <CircularProgress size={18} sx={{ color: "#fff" }} />
                        ) : (
                            <ShoppingCartRounded />
                        )
                    }
                    disabled={!canSubmit}
                    onClick={onSubmit}
                    sx={{
                        minHeight: 52,
                        px: 3,
                        bgcolor: "rgba(0,169,232,0.86)",
                        color: "#fff",
                        textTransform: "none",
                        fontSize: 16,
                        fontWeight: 900,
                        borderRadius: 1,
                        boxShadow: "none",
                        "&:hover": {
                            bgcolor: "rgba(0,169,232,0.96)",
                            boxShadow: "none",
                        },
                    }}
                >
                    {isPending ? "Memproses..." : "Submit Pembelian"}
                </Button>
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
