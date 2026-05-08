import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type StatusProgressProps = {
    label: string;
    count: number;
    total: number;
    color: string;
    icon: ReactNode;
};

export function StatusProgress({
    label,
    count,
    total,
    color,
    icon,
}: StatusProgressProps) {
    const value = total ? Math.round((count / total) * 100) : 0;

    return (
        <Box>
            <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                >
                    <Box sx={{ color, display: "flex" }}>{icon}</Box>
                    <Typography
                        sx={{ color: "#fff", fontSize: 14, fontWeight: 900 }}
                    >
                        {label}
                    </Typography>
                </Stack>
                <Typography sx={{ color, fontSize: 14, fontWeight: 900 }}>
                    {count} ({value}%)
                </Typography>
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
                        bgcolor: color,
                    },
                }}
            />
        </Box>
    );
}
