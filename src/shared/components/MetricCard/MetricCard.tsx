import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { DashboardCard } from "../DashboardCard/DashboardCard";

type MetricCardProps = {
    label: string;
    value: string | number;
    icon: ReactNode;
    color: string;
    description: string;
};

export function MetricCard({
    label,
    value,
    icon,
    color,
    description,
}: MetricCardProps) {
    return (
        <DashboardCard>
            <Stack
                direction="row"
                sx={{
                    alignItems: "flex-start",
                    gap: 1.5,
                    justifyContent: "space-between",
                    minWidth: 0,
                }}
            >
                <Box
                    sx={{
                        flex: "0 0 auto",
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        display: "grid",
                        placeItems: "center",
                        color,
                        bgcolor: `${color}22`,
                    }}
                >
                    {icon}
                </Box>
                <Typography
                    sx={{
                        color,
                        flex: "1 1 auto",
                        fontSize: "clamp(20px, 1.7vw, 28px)",
                        fontWeight: 900,
                        lineHeight: 1,
                        minWidth: 0,
                        overflowWrap: "anywhere",
                        textAlign: "right",
                    }}
                >
                    {value}
                </Typography>
            </Stack>
            <Typography
                sx={{ mt: 1.5, color: "#fff", fontSize: 15, fontWeight: 900 }}
            >
                {label}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.58)", fontSize: 12 }}>
                {description}
            </Typography>
        </DashboardCard>
    );
}
