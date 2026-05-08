import {
    AccountBalanceWalletRounded,
    AddRounded,
    CheckCircleRounded,
    ErrorRounded,
    MoreHorizRounded,
    PendingActionsRounded,
    ReceiptLongRounded,
    RouterRounded,
    SecurityRounded,
    ShoppingCartRounded,
    SpeedRounded,
    WifiRounded,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useAuthStore } from "./features/auth/store/auth.store";

const stats = [
    {
        label: "Total Transaksi",
        value: "128",
        icon: <ReceiptLongRounded />,
        color: "#00a9e8",
    },
    {
        label: "Total Pembelian",
        value: "Rp 8,4 jt",
        icon: <ShoppingCartRounded />,
        color: "#8cc63f",
    },
    {
        label: "Menunggu",
        value: "7",
        icon: <PendingActionsRounded />,
        color: "#f6c400",
    },
    {
        label: "Gagal",
        value: "2",
        icon: <ErrorRounded />,
        color: "#ff5f86",
    },
];

const packages = [
    {
        name: "Home Fiber 30 Mbps",
        quota: "Unlimited",
        price: "Rp 249.000",
        progress: 72,
    },
    {
        name: "Data Booster 50 GB",
        quota: "30 hari",
        price: "Rp 89.000",
        progress: 54,
    },
    {
        name: "Business 100 Mbps",
        quota: "Unlimited",
        price: "Rp 699.000",
        progress: 86,
    },
];

const transactions = [
    {
        invoice: "INV-2508-001",
        item: "Home Fiber 30 Mbps",
        customer: "Budi Santoso",
        price: "Rp 249.000",
        date: "08 Mei 2026",
        status: "Sukses",
    },
    {
        invoice: "INV-2508-002",
        item: "Data Booster 50 GB",
        customer: "Nadia Putri",
        price: "Rp 89.000",
        date: "08 Mei 2026",
        status: "Diproses",
    },
    {
        invoice: "INV-2508-003",
        item: "Business 100 Mbps",
        customer: "CV Lintas Media",
        price: "Rp 699.000",
        date: "07 Mei 2026",
        status: "Sukses",
    },
];

function App() {
    const user = useAuthStore((state) => state.user);

    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 3,
                    color: "#fff",
                    overflow: "hidden",
                    position: "relative",
                    background:
                        "linear-gradient(135deg, #006bb6 0%, #00a9e8 100%)",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.16,
                        backgroundImage:
                            "radial-gradient(circle at 18px 18px, #fff 2px, transparent 0)",
                        backgroundSize: "34px 34px",
                    }}
                />
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        gap: 2,
                        position: "relative",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
                        >
                            <SecurityRounded />
                            <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                                Tingkatkan keamanan akun
                            </Typography>
                        </Stack>
                        <Typography sx={{ mt: 0.75, color: "rgba(255,255,255,0.82)" }}>
                            Aktifkan verifikasi tambahan untuk transaksi paket
                            internet dan pengelolaan saldo.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            alignSelf: { xs: "flex-start", md: "center" },
                            bgcolor: "#fff",
                            color: "#006bb6",
                            textTransform: "none",
                            fontWeight: 900,
                            "&:hover": { bgcolor: "#edfaff" },
                        }}
                    >
                        Atur Sekarang
                    </Button>
                </Stack>
            </Paper>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <DashboardCard>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: "center" }}
                        >
                            <Avatar
                                sx={{
                                    width: 58,
                                    height: 58,
                                    bgcolor: "#006bb6",
                                    fontWeight: 900,
                                }}
                            >
                                {user?.name?.charAt(0) ?? "U"}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                                    {user?.name ?? "Member DNET"}
                                </Typography>
                                <Chip
                                    label="Member Area"
                                    size="small"
                                    sx={{
                                        mt: 0.75,
                                        bgcolor: "rgba(0,169,232,0.16)",
                                        color: "#72d8ff",
                                        fontWeight: 800,
                                    }}
                                />
                            </Box>
                            <IconButton sx={{ color: "rgba(255,255,255,0.8)" }}>
                                <MoreHorizRounded />
                            </IconButton>
                        </Stack>
                        <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.1)" }} />
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <RouterRounded sx={{ color: "#8cc63f" }} />
                            <Typography sx={{ color: "rgba(255,255,255,0.76)" }}>
                                ID Pelanggan: DNET-0821-4455
                            </Typography>
                        </Stack>
                    </DashboardCard>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <DashboardCard>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1.25}
                                sx={{ alignItems: "center" }}
                            >
                                <AccountBalanceWalletRounded sx={{ color: "#f6c400" }} />
                                <Typography sx={{ fontWeight: 900 }}>
                                    Saldo Pembelian
                                </Typography>
                            </Stack>
                            <Button
                                startIcon={<AddRounded />}
                                variant="contained"
                                size="small"
                                sx={{
                                    bgcolor: "#f6c400",
                                    color: "#102331",
                                    textTransform: "none",
                                    fontWeight: 900,
                                    "&:hover": { bgcolor: "#e5b600" },
                                }}
                            >
                                Top Up
                            </Button>
                        </Stack>
                        <Typography sx={{ mt: 2.5, fontSize: 34, fontWeight: 900 }}>
                            Rp 1.250.000
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.68)" }}>
                            Siap digunakan untuk aktivasi paket data internet.
                        </Typography>
                    </DashboardCard>
                </Grid>
            </Grid>

            <Box>
                <Typography sx={sectionTitleSx}>Ringkasan Hari Ini</Typography>
                <Grid container spacing={3}>
                    {stats.map((stat) => (
                        <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
                            <DashboardCard>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            display: "grid",
                                            placeItems: "center",
                                            color: stat.color,
                                            bgcolor: `${stat.color}22`,
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: stat.color,
                                            fontSize: 34,
                                            fontWeight: 900,
                                            lineHeight: 1,
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                </Stack>
                                <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
                                    {stat.label}
                                </Typography>
                            </DashboardCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 7 }}>
                    <DashboardCard>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Typography sx={sectionTitleSx}>
                                Paket Internet Populer
                            </Typography>
                            <Button sx={linkButtonSx}>Lihat Semua</Button>
                        </Stack>
                        <Stack spacing={2}>
                            {packages.map((item) => (
                                <Box key={item.name}>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            gap: 2,
                                            justifyContent: "space-between",
                                            mb: 1,
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontWeight: 900 }}>
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "rgba(255,255,255,0.62)",
                                                    fontSize: 13,
                                                }}
                                            >
                                                Kuota {item.quota}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 900, color: "#72d8ff" }}>
                                            {item.price}
                                        </Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={item.progress}
                                        sx={{
                                            height: 9,
                                            borderRadius: 999,
                                            bgcolor: "rgba(255,255,255,0.1)",
                                            "& .MuiLinearProgress-bar": {
                                                borderRadius: 999,
                                                bgcolor: "#00a9e8",
                                            },
                                        }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </DashboardCard>
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                    <DashboardCard>
                        <Typography sx={sectionTitleSx}>Pembelian Cepat</Typography>
                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                            {[
                                ["Paket Data 25 GB", "Rp 55.000"],
                                ["Tambah Speed 1 Hari", "Rp 25.000"],
                                ["Renew Home Fiber", "Rp 249.000"],
                            ].map(([name, price]) => (
                                <Box
                                    key={name}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        p: 1.5,
                                        borderRadius: 2,
                                        bgcolor: "rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1.25}
                                        sx={{ alignItems: "center" }}
                                    >
                                        <WifiRounded sx={{ color: "#8cc63f" }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 900 }}>
                                                {name}
                                            </Typography>
                                            <Typography sx={{ color: "#72d8ff", fontSize: 13 }}>
                                                {price}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Button size="small" sx={linkButtonSx}>
                                        Beli
                                    </Button>
                                </Box>
                            ))}
                        </Stack>
                    </DashboardCard>
                </Grid>
            </Grid>

            <DashboardCard>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 1,
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Typography sx={sectionTitleSx}>
                        Riwayat Pembelian Paket Internet
                    </Typography>
                    <Chip
                        icon={<CheckCircleRounded />}
                        label="3 transaksi terbaru"
                        sx={{
                            bgcolor: "rgba(140,198,63,0.16)",
                            color: "#b7f477",
                            fontWeight: 800,
                        }}
                    />
                </Stack>
                <TableContainer>
                    <Table sx={{ minWidth: 780 }}>
                        <TableHead>
                            <TableRow>
                                {[
                                    "Nomor Invoice",
                                    "Paket",
                                    "Pelanggan",
                                    "Harga",
                                    "Tanggal",
                                    "Status",
                                ].map((head) => (
                                    <TableCell key={head} sx={tableHeadSx}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => (
                                <TableRow key={row.invoice}>
                                    <TableCell sx={tableCellSx}>{row.invoice}</TableCell>
                                    <TableCell sx={tableCellSx}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ alignItems: "center" }}
                                        >
                                            <SpeedRounded sx={{ color: "#00a9e8" }} />
                                            {row.item}
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={tableCellSx}>{row.customer}</TableCell>
                                    <TableCell sx={tableCellSx}>{row.price}</TableCell>
                                    <TableCell sx={tableCellSx}>{row.date}</TableCell>
                                    <TableCell sx={tableCellSx}>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            sx={{
                                                bgcolor:
                                                    row.status === "Sukses"
                                                        ? "rgba(140,198,63,0.16)"
                                                        : "rgba(246,196,0,0.16)",
                                                color:
                                                    row.status === "Sukses"
                                                        ? "#b7f477"
                                                        : "#f6d84f",
                                                fontWeight: 900,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardCard>
        </Stack>
    );
}

function DashboardCard({ children }: { children: React.ReactNode }) {
    return (
        <Paper
            elevation={0}
            sx={{
                height: "100%",
                p: 3,
                borderRadius: 3,
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

const sectionTitleSx = {
    color: "#fff",
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 0,
};

const linkButtonSx = {
    color: "#72d8ff",
    textTransform: "none",
    fontWeight: 900,
};

const tableHeadSx = {
    color: "rgba(255,255,255,0.72)",
    fontWeight: 900,
    borderColor: "rgba(255,255,255,0.1)",
};

const tableCellSx = {
    color: "rgba(255,255,255,0.86)",
    borderColor: "rgba(255,255,255,0.08)",
};

export default App;
