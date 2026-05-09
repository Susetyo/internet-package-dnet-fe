import { ShoppingCartRounded, WifiRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import heroImage from "../../../assets/hero.png";
import { formatCurrency, getSpeedLabel } from "../../../shared/utils";
import type { PackageBuyCardProps } from "../types/package.types";

export function PackageBuyCard({
    pack,
    accent,
    imageTheme,
    isPending,
    isRecommended,
    onBuy,
}: PackageBuyCardProps) {
    const quotaLabel = pack.quotaGb > 0 ? `${pack.quotaGb} GB` : "Unlimited";
    const headlineMetric =
        pack.quotaGb > 0 ? `${pack.quotaGb} GB` : getSpeedLabel(pack);
    const price = formatCurrency(pack.price).replace("Rp", "").trim();

    return (
        <Box
            sx={{
                height: "100%",
                minHeight: 560,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 1,
                background:
                    "linear-gradient(180deg, rgba(35,62,80,0.88) 0%, rgba(19,36,50,0.94) 100%)",
                boxShadow: `0 22px 46px rgba(0,0,0,0.22), 0 0 34px ${accent}14`,
                backdropFilter: "blur(14px)",
                transition: "transform 160ms ease, box-shadow 160ms ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 28px 54px rgba(0,0,0,0.28), 0 0 38px ${accent}20`,
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: 188,
                    backgroundImage: `${imageTheme.overlay}, url(${heroImage}), ${imageTheme.background}`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover, 180px auto, cover",
                    backgroundPosition: "center, right 24px center, center",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: 28,
                        top: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        borderRadius: 2,
                        px: 2,
                        py: 1.15,
                        bgcolor: "rgba(255,255,255,0.94)",
                        color: "#0075bd",
                        boxShadow: "0 14px 30px rgba(0,0,0,0.14)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: 28, md: 34 },
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: 0,
                        }}
                    >
                        {headlineMetric}
                    </Typography>
                    <WifiRounded sx={{ color: "#f6c400", fontSize: 30 }} />
                </Box>
                {isRecommended && (
                    <Chip
                        label="Terlaris"
                        size="small"
                        sx={{
                            position: "absolute",
                            right: 18,
                            bottom: 18,
                            bgcolor: "#f6c400",
                            color: "#102331",
                            fontWeight: 900,
                        }}
                    />
                )}
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2.5, md: 3 },
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        color: "#d9f4ff",
                        fontSize: { xs: 21, md: 24 },
                        fontWeight: 900,
                        letterSpacing: 0,
                        lineHeight: 1.2,
                    }}
                >
                    {pack.name}
                </Typography>
                <Typography
                    sx={{
                        color: accent,
                        fontSize: 18,
                        fontWeight: 900,
                        mt: 1.5,
                    }}
                >
                    {headlineMetric}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.72)", mt: 2.25 }}>
                    Harga belum termasuk PPN 11%
                </Typography>
                <Typography
                    sx={{
                        color: "rgba(255,255,255,0.58)",
                        mt: 1.25,
                        fontSize: 14,
                    }}
                >
                    {pack.provider} • Kuota {quotaLabel} • {pack.validityDays}{" "}
                    hari
                </Typography>

                <Box
                    sx={{
                        mt: 4,
                        mb: 2.25,
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center",
                        gap: 1,
                        color: "#f7fbff",
                    }}
                >
                    <Typography sx={{ fontSize: 20, fontWeight: 900 }}>
                        Rp
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: 40, md: 46 },
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: 0,
                        }}
                    >
                        {price}
                    </Typography>
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.72)",
                            fontSize: 16,
                            fontWeight: 900,
                        }}
                    >
                        / Bulan
                    </Typography>
                </Box>

                <Stack spacing={1.25} sx={{ mt: "auto" }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={
                            isPending ? (
                                <CircularProgress
                                    size={18}
                                    sx={{ color: "#fff" }}
                                />
                            ) : (
                                <ShoppingCartRounded />
                            )
                        }
                        disabled={isPending}
                        onClick={onBuy}
                        sx={{
                            minHeight: 52,
                            bgcolor: "rgba(0,169,232,0.82)",
                            color: "#fff",
                            textTransform: "none",
                            fontSize: 16,
                            fontWeight: 900,
                            borderRadius: 1,
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "rgba(0,169,232,0.95)",
                                boxShadow: "none",
                            },
                        }}
                    >
                        {isPending ? "Memproses..." : "Beli Paket"}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
