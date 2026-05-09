import {
    DashboardRounded,
    HistoryRounded,
    LogoutRounded,
    PeopleRounded,
    ReceiptLongRounded,
    SearchRounded,
    WifiRounded,
} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Container,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth.store";

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { user, logout } = useAuthStore();
    const [avatarAnchor, setAvatarAnchor] = useState<HTMLElement | null>(null);
    const packageSearch =
        location.pathname === "/dashboard/beli-paket"
            ? searchParams.get("search") ?? ""
            : "";
    const menuItems = [
        {
            label: "Dashboard",
            mobileLabel: "Dashboard",
            icon: <DashboardRounded />,
            path: "/dashboard",
        },
        {
            label: user?.role === "admin" ? "Beli Paket Admin" : "Beli Paket",
            mobileLabel: "Paket",
            icon: <WifiRounded />,
            path:
                user?.role === "admin"
                    ? "/dashboard/admin/beli-paket"
                    : "/dashboard/beli-paket",
        },
        ...(user?.role === "admin"
            ? [
                  {
                      label: "Customer",
                      mobileLabel: "Customer",
                      icon: <PeopleRounded />,
                      path: "/dashboard/admin/customer",
                  },
              ]
            : []),
        {
            label: "Transaksi",
            mobileLabel: "Transaksi",
            icon: <ReceiptLongRounded />,
            path:
                user?.role === "admin"
                    ? "/dashboard/admin/transaksi"
                    : "/dashboard/transaksi",
        },
        {
            label:
                user?.role === "admin" ? "Riwayat Customer" : "Riwayat",
            mobileLabel: "Riwayat",
            icon: <HistoryRounded />,
            path:
                user?.role === "admin"
                    ? "/dashboard/admin/riwayat"
                    : "/dashboard/riwayat",
        },
    ];
    const handleNavigate = (path: string) => {
        navigate(path);
    };
    const handleLogout = () => {
        logout();
        setAvatarAnchor(null);
        navigate("/login");
    };
    const activePath =
        menuItems.find((item) => location.pathname === item.path)?.path ??
        "/dashboard";
    const MenuContent = () => (
        <Box
            sx={{
                p: 1.5,
                minWidth: 280,
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
                        onClick={() => handleNavigate(item.path)}
                        sx={{
                            mx: 0.5,
                            mb: 0.75,
                            borderRadius: 1,
                            color: "rgba(255,255,255,0.78)",
                            "&.Mui-selected": {
                                bgcolor: "transparent",
                                color: "#f6c400",
                                "& .MuiListItemIcon-root": {
                                    color: "#f6c400",
                                },
                            },
                            "&:hover": {
                                bgcolor: "transparent",
                                color: "#f6c400",
                                "& .MuiListItemIcon-root": {
                                    color: "#f6c400",
                                },
                            },
                            "&.Mui-selected:hover": {
                                bgcolor: "transparent",
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
                onClick={handleLogout}
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
    );

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
                        <Box
                            sx={{
                                display: { xs: "block", md: "none" },
                                width: 40,
                            }}
                        />
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
                        {user?.role !== "admin" && (
                            <TextField
                                placeholder="Cari paket internet"
                                value={packageSearch}
                                onChange={(event) => {
                                    const keyword = event.target.value;

                                    navigate(
                                        keyword.trim()
                                            ? `/dashboard/beli-paket?search=${encodeURIComponent(keyword)}`
                                            : "/dashboard/beli-paket",
                                    );
                                }}
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
                        )}
                        <Avatar
                            onClick={(event) =>
                                setAvatarAnchor(event.currentTarget)
                            }
                            sx={{
                                bgcolor: "#006bb6",
                                fontWeight: 800,
                                cursor: "pointer",
                            }}
                        >
                            {user?.name?.charAt(0) ?? "U"}
                        </Avatar>
                    </Container>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={avatarAnchor}
                open={Boolean(avatarAnchor)}
                onClose={() => setAvatarAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            minWidth: 160,
                            bgcolor: "rgba(14, 29, 42, 0.98)",
                            color: "#f7fbff",
                            border: "1px solid rgba(255,255,255,0.1)",
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        color: "#ff7f9c",
                        fontWeight: 800,
                        gap: 1,
                    }}
                >
                    <LogoutRounded fontSize="small" />
                    Keluar
                </MenuItem>
            </Menu>

            <Container
                maxWidth="xl"
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
                    gap: 3,
                    pt: 4,
                    pb: { xs: 12, md: 4 },
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
                            bgcolor: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <MenuContent />
                    </Box>
                </Box>

                <Box component="main" sx={{ minWidth: 0 }}>
                    <Outlet />
                </Box>
            </Container>

            <Paper
                elevation={12}
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    bgcolor: "rgba(9, 16, 24, 0.96)",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 0,
                    backdropFilter: "blur(18px)",
                    pb: "env(safe-area-inset-bottom)",
                }}
            >
                <BottomNavigation
                    showLabels
                    value={activePath}
                    onChange={(_, value: string) => handleNavigate(value)}
                    sx={{
                        height: 68,
                        bgcolor: "transparent",
                        "& .MuiBottomNavigationAction-root": {
                            minWidth: 0,
                            color: "rgba(255,255,255,0.62)",
                            px: 0.5,
                        },
                        "& .MuiBottomNavigationAction-root.Mui-selected": {
                            color: "#f6c400",
                        },
                        "& .MuiBottomNavigationAction-root.Mui-selected svg": {
                            color: "#f6c400",
                        },
                        "& .MuiBottomNavigationAction-label": {
                            fontSize: 10,
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                        },
                    }}
                >
                    {menuItems.map((item) => (
                        <BottomNavigationAction
                            key={item.path}
                            label={item.mobileLabel}
                            value={item.path}
                            icon={item.icon}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
