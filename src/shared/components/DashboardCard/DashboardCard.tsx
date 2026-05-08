import { Paper } from "@mui/material";
import type { ReactNode } from "react";

export function DashboardCard({ children }: { children: ReactNode }) {
    return (
        <Paper
            elevation={0}
            sx={{
                height: "100%",
                p: 2.5,
                borderRadius: 1.25,
                bgcolor: "rgba(18, 28, 42, 0.72)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
                color: "#fff",
            }}
        >
            {children}
        </Paper>
    );
}
