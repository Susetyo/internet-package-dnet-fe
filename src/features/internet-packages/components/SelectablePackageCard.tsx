import { WifiRounded } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { formatCurrency, getSpeedLabel } from "../../../shared/utils";
import type { SelectablePackageCardProps } from "../types/admin-buy-package.types";

export function SelectablePackageCard({
    pack,
    accent,
    selected,
    disabled,
    onSelect,
}: SelectablePackageCardProps) {
    const quotaLabel = pack.quotaGb > 0 ? `${pack.quotaGb} GB` : "Unlimited";

    return (
        <Box
            component="button"
            type="button"
            disabled={disabled}
            onClick={onSelect}
            sx={{
                width: "100%",
                height: "100%",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                border: selected
                    ? `2px solid ${accent}`
                    : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 1,
                p: 0,
                overflow: "hidden",
                cursor: disabled ? "not-allowed" : "pointer",
                background:
                    "linear-gradient(180deg, rgba(35,62,80,0.9) 0%, rgba(19,36,50,0.96) 100%)",
                boxShadow: selected
                    ? `0 22px 44px rgba(0,0,0,0.26), 0 0 0 4px ${accent}24`
                    : "0 16px 34px rgba(0,0,0,0.18)",
                transition: "transform 160ms ease, border-color 160ms ease",
                "&:hover": {
                    transform: disabled ? "none" : "translateY(-3px)",
                    borderColor: accent,
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    p: 2.25,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    background: `linear-gradient(135deg, ${accent}22, rgba(255,255,255,0.04))`,
                }}
            >
                <Stack
                    direction="row"
                    sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 1,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: `${accent}22`,
                            color: accent,
                        }}
                    >
                        <WifiRounded />
                    </Box>
                    {selected && (
                        <Chip
                            label="Dipilih"
                            size="small"
                            sx={{
                                bgcolor: accent,
                                color: "#102331",
                                fontWeight: 900,
                            }}
                        />
                    )}
                </Stack>
            </Box>

            <Stack spacing={1.25} sx={{ flex: 1, width: "100%", p: 2.25 }}>
                <Typography
                    sx={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 900,
                        letterSpacing: 0,
                        lineHeight: 1.25,
                    }}
                >
                    {pack.name}
                </Typography>
                <Typography sx={{ color: accent, fontSize: 16, fontWeight: 900 }}>
                    {getSpeedLabel(pack)}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.62)", fontSize: 14 }}>
                    {pack.provider} - Kuota {quotaLabel} - {pack.validityDays} hari
                </Typography>
                <Box sx={{ mt: "auto" }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.58)", fontSize: 13 }}>
                        Harga paket
                    </Typography>
                    <Typography
                        sx={{
                            color: "#f7fbff",
                            fontSize: 26,
                            fontWeight: 900,
                            letterSpacing: 0,
                        }}
                    >
                        {formatCurrency(pack.price)}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}
