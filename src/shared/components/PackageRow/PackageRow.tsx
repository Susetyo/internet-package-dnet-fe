import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import type { InternetPackage } from "../../../features/internet-packages/types/package.types";
import { formatCurrency } from "../../utils";

type PackageRowProps = {
    pack: InternetPackage & { transactionCount: number };
    maxCount: number;
};

export function PackageRow({ pack, maxCount }: PackageRowProps) {
    const value = Math.round((pack.transactionCount / maxCount) * 100);
    const quotaLabel = pack.quotaGb ? `${pack.quotaGb} GB` : "Unlimited";

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                }}
            >
                <Box>
                    <Typography
                        sx={{ color: "#fff", fontSize: 14, fontWeight: 900 }}
                    >
                        {pack.name}
                    </Typography>
                    <Typography
                        sx={{ color: "rgba(255,255,255,0.58)", fontSize: 12 }}
                    >
                        {quotaLabel} • {pack.validityDays} hari
                        {pack.provider ? ` • ${pack.provider}` : ""}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                    <Typography
                        sx={{ color: "#72d8ff", fontSize: 14, fontWeight: 900 }}
                    >
                        {formatCurrency(pack.price)}
                    </Typography>
                    <Typography
                        sx={{ color: "rgba(255,255,255,0.58)", fontSize: 12 }}
                    >
                        {pack.transactionCount} transaksi
                    </Typography>
                </Box>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    height: 7,
                    borderRadius: 1,
                    bgcolor: "rgba(255,255,255,0.1)",
                    "& .MuiLinearProgress-bar": {
                        borderRadius: 1,
                        bgcolor: "#00a9e8",
                    },
                }}
            />
        </Box>
    );
}
