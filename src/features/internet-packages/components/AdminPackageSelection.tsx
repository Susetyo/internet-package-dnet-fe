import { Box, Chip, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { DashboardCard, EmptyPanel } from "../../../shared/components";
import type { AdminPackageSelectionProps } from "../types/admin-buy-package.types";
import { SelectablePackageCard } from "./SelectablePackageCard";

const packageAccents = ["#72d8ff", "#f6c400", "#8cc63f", "#ff8fb3"];

export function AdminPackageSelection({
    packs,
    selectedPackage,
    selectedPackageId,
    isLoading,
    disabled,
    onSelectPackage,
}: AdminPackageSelectionProps) {
    return (
        <Box>
            <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    gap: 1.5,
                    mb: 2,
                }}
            >
                <Box>
                    <Typography sx={sectionTitleSx}>Pilih Paket Internet</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.62)", mt: 0.5 }}>
                        Klik salah satu card paket sebelum submit transaksi.
                    </Typography>
                </Box>
                <Chip
                    label={
                        selectedPackage
                            ? `Dipilih: ${selectedPackage.name}`
                            : "Belum ada paket"
                    }
                    sx={{
                        bgcolor: selectedPackage
                            ? "rgba(140,198,63,0.16)"
                            : "rgba(255,255,255,0.1)",
                        color: selectedPackage ? "#b7f477" : "rgba(255,255,255,0.72)",
                        fontWeight: 900,
                    }}
                />
            </Stack>

            {isLoading ? (
                <DashboardCard>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                        <CircularProgress size={22} sx={{ color: "#72d8ff" }} />
                        <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                            Memuat data pembelian...
                        </Typography>
                    </Stack>
                </DashboardCard>
            ) : packs.length ? (
                <Grid container spacing={2.5}>
                    {packs.map((pack, index) => (
                        <Grid key={pack.id} size={{ xs: 12, md: 6, xl: 4 }}>
                            <SelectablePackageCard
                                pack={pack}
                                accent={packageAccents[index % packageAccents.length]}
                                selected={selectedPackageId === pack.id}
                                disabled={disabled}
                                onSelect={() => onSelectPackage(pack.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <DashboardCard>
                    <EmptyPanel message="Belum ada paket internet yang tersedia." />
                </DashboardCard>
            )}
        </Box>
    );
}

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
};
