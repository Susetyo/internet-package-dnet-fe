import {
    DashboardRounded,
    HistoryRounded,
    LogoutRounded,
    MenuRounded,
    ReceiptLongRounded,
    SearchRounded,
    SupportAgentRounded,
    WifiRounded,
} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth.store";

const menuItems = [
    { label: "Dashboard", icon: <DashboardRounded />, path: "/dashboard" },
    { label: "Beli Paket", icon: <WifiRounded />, path: "/dashboard/beli-paket" },
    { label: "Transaksi", icon: <ReceiptLongRounded />, path: "/dashboard/transaksi" },
    { label: "Riwayat", icon: <HistoryRounded />, path: "/dashboard/riwayat" },
];

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();

    return (
        <Box
            sx={{
                minHeight: "100dvh",
                color: "#f7fbff",
                background:
                    "radial-gradient(circle at 16% 0%, rgba(0, 169, 232, 0.28), transparent 28%), linear-gradient(135deg, #102331 0%, #192735 42%, #1f2638 100%)",
            }}
        >
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "rgba(9, 16, 24, 0.9)",
                    backdropFilter: "blur(18px)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <Toolbar sx={{ minHeight: 70, px: { xs: 0 } }}>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            width: "100%",
                        }}
                    >
                        <IconButton
                            sx={{ display: { md: "none" }, color: "#fff" }}
                            aria-label="menu"
                        >
                            <MenuRounded />
                        </IconButton>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.25,
                                minWidth: { md: 260 },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 1,
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: "#fff",
                                    color: "#006bb6",
                                    fontWeight: 900,
                                    fontSize: 18,
                                }}
                            >
                                d~
                            </Box>
                            <Typography
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                fontSize: 20,
                                    fontWeight: 900,
                                    letterSpacing: 0,
                                }}
                            >
                                net
                            </Typography>
                        </Box>
                        <TextField
                            placeholder="Cari paket internet, invoice, atau nomor pelanggan"
                            size="small"
                            sx={{
                                flex: 1,
                                maxWidth: 760,
                                "& .MuiInputBase-root": {
                                    color: "#fff",
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    borderRadius: 1,
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    color: "rgba(255,255,255,0.72)",
                                    opacity: 1,
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRounded
                                                sx={{ color: "#b9d6e7" }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <Avatar sx={{ bgcolor: "#006bb6", fontWeight: 800 }}>
                            {user?.name?.charAt(0) ?? "U"}
                        </Avatar>
                    </Container>
                </Toolbar>
            </AppBar>

            <Container
                maxWidth="xl"
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
                    gap: 3,
                    py: 4,
                }}
            >
                <Box
                    component="aside"
                    sx={{ display: { xs: "none", md: "block" } }}
                >
                    <Box
                        sx={{
                            position: "sticky",
                            top: 96,
                            borderRadius: 1.25,
                            p: 1.5,
                            bgcolor: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                mb: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                color: "#f6c400",
                                fontWeight: 800,
                            }}
                        >
                            <WifiRounded fontSize="small" />
                            Internet Portal
                        </Box>
                        <List disablePadding>
                            {menuItems.map((item) => (
                                <ListItemButton
                                    key={item.label}
                                    selected={location.pathname === item.path}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        mb: 0.75,
                                        borderRadius: 1,
                                        color: "rgba(255,255,255,0.78)",
                                        "&.Mui-selected": {
                                            bgcolor: "#f6c400",
                                            color: "#102331",
                                            "& .MuiListItemIcon-root": {
                                                color: "#102331",
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 38,
                                            color: "rgba(255,255,255,0.72)",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        slotProps={{
                                            primary: {
                                                sx: {
                                                    fontSize: 14,
                                                    fontWeight: 800,
                                                },
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                        <Button
                            fullWidth
                            startIcon={<LogoutRounded />}
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            sx={{
                                mt: 2,
                                justifyContent: "flex-start",
                                color: "#ff7f9c",
                                textTransform: "none",
                                fontWeight: 800,
                                borderRadius: 1,
                                px: 2,
                            }}
                        >
                            Keluar
                        </Button>
                    </Box>
                </Box>

                <Box component="main" sx={{ minWidth: 0 }}>
                    <Outlet />
                </Box>
            </Container>

            <Button
                variant="contained"
                startIcon={<SupportAgentRounded />}
                sx={{
                    position: "fixed",
                    right: 22,
                    bottom: 22,
                    bgcolor: "#f6c400",
                    color: "#102331",
                    textTransform: "none",
                    fontWeight: 900,
                    borderRadius: 999,
                    boxShadow: "0 12px 26px rgba(0,0,0,0.25)",
                    "&:hover": { bgcolor: "#e5b600" },
                }}
            >
                Customer Service
            </Button>
        </Box>
    );
}
