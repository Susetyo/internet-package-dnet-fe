import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth.store";

export function DashboardLayout() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    return (
        <Box sx={{ minHeight: "100dvh", pb: 9 }}>
            <AppBar
                position="sticky"
                color="inherit"
                elevation={0}
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Toolbar>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 900 }}>
                            DataX Commerce
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Hi, {user?.name}
                        </Typography>
                    </Box>
                    <Button
                        size="small"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ pt: 3 }}>
                <Outlet />
            </Container>
        </Box>
    );
}
