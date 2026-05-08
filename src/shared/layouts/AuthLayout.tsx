import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <Box
            sx={{
                minHeight: "100dvh",
                display: "grid",
                placeItems: "center",
                p: { xs: 1.5, md: 0 },
                background:
                    "radial-gradient(circle at 16% 0%, rgba(0, 169, 232, 0.28), transparent 28%), linear-gradient(135deg, #102331 0%, #192735 42%, #1f2638 100%)",
            }}
        >
            <Container
                maxWidth={false}
                disableGutters
                sx={{ width: "100%", minHeight: { md: "100dvh" } }}
            >
                <Outlet />
            </Container>
        </Box>
    );
}
