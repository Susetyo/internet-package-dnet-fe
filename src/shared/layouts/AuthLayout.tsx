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
                bgcolor: { xs: "#d9f1fb", md: "#fff" },
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
