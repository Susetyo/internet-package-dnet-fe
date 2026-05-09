import { CheckCircleRounded, ShoppingCartRounded } from "@mui/icons-material";
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/auth.store";
import { DashboardCard, EmptyPanel } from "../../../shared/components";
import { usePackagesQuery } from "../../../shared/hooks";
import { PackageBuyCard } from "../components";
import { useBuyPackageMutation } from "../hooks";
import type { InternetPackage } from "../types/package.types";

const packageAccents = ["#72d8ff", "#f6c400", "#8cc63f", "#ff8fb3"];
const imageThemes = [
    {
        overlay:
            "linear-gradient(135deg, rgba(0,107,182,0.88), rgba(0,169,232,0.48))",
        background:
            "radial-gradient(circle at 20% 20%, #8be4ff 0%, transparent 30%), linear-gradient(135deg, #006bb6, #0b2841)",
    },
    {
        overlay:
            "linear-gradient(135deg, rgba(15,57,96,0.82), rgba(246,196,0,0.34))",
        background:
            "radial-gradient(circle at 80% 12%, #ffd95a 0%, transparent 28%), linear-gradient(135deg, #214e78, #161f34)",
    },
    {
        overlay:
            "linear-gradient(135deg, rgba(0,88,126,0.86), rgba(140,198,63,0.4))",
        background:
            "radial-gradient(circle at 80% 20%, #9cf27b 0%, transparent 30%), linear-gradient(135deg, #00587e, #102331)",
    },
    {
        overlay:
            "linear-gradient(135deg, rgba(56,50,118,0.84), rgba(255,143,179,0.42))",
        background:
            "radial-gradient(circle at 24% 16%, #ffb6d0 0%, transparent 28%), linear-gradient(135deg, #383276, #102331)",
    },
];

export function BuyPackagePage() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const customerId = user?.customerId;
    const redirectTimerRef = useRef<number | null>(null);
    const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
        null,
    );
    const [successPackageName, setSuccessPackageName] = useState("");

    const {
        data: packs = [],
        isLoading,
        isError,
    } = usePackagesQuery();

    const recommendedPackage = useMemo(
        () => packs.reduce<InternetPackage | undefined>((best, pack) => {
            if (!best) return pack;
            return pack.price > best.price ? pack : best;
        }, undefined),
        [packs],
    );

    const buyPackageMutation = useBuyPackageMutation({
        customerId,
        onMutate: (pack) => {
            setSelectedPackageId(pack.id);
            setSuccessPackageName("");
        },
        onSuccess: (pack) => {
            setSuccessPackageName(pack.name);
            redirectTimerRef.current = window.setTimeout(() => {
                navigate("/dashboard/transaksi");
            }, 1200);
        },
        onSettled: () => setSelectedPackageId(null),
    });

    useEffect(() => {
        return () => {
            if (redirectTimerRef.current) {
                window.clearTimeout(redirectTimerRef.current);
            }
        };
    }, []);

    if (!customerId) {
        return (
            <Alert severity="error">
                Akun customer belum memiliki `customerId`. Hubungi admin untuk
                menghubungkan akun dengan data customer.
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {isError && (
                <Alert severity="error">
                    Gagal mengambil data paket dari json-server. Pastikan `pnpm
                    server` berjalan di port 3001.
                </Alert>
            )}
            {buyPackageMutation.isError && (
                <Alert severity="error">
                    Pembelian paket gagal diproses. Coba lagi beberapa saat.
                </Alert>
            )}
            {successPackageName && (
                <Alert icon={<CheckCircleRounded fontSize="inherit" />} severity="success">
                    Pembelian {successPackageName} berhasil dibuat. Anda akan
                    diarahkan ke menu transaksi.
                </Alert>
            )}
            <Box>
                <Typography
                    component="h1"
                    sx={{
                        color: "#fff",
                        fontSize: { xs: 24, md: 28 },
                        fontWeight: 900,
                        letterSpacing: 0,
                        m: 0,
                    }}
                >
                    Beli Paket Internet
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Pilih paket internet yang tersedia untuk akun customer Anda.
                </Typography>
            </Box>

            <DashboardCard>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1.5,
                                display: "grid",
                                placeItems: "center",
                                bgcolor: "rgba(246,196,0,0.16)",
                                color: "#f6c400",
                            }}
                        >
                            <ShoppingCartRounded />
                        </Box>
                        <Box>
                            <Typography sx={sectionTitleSx}>
                                Semua Paket Tersedia
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                                Transaksi baru otomatis tercatat ke akun {user?.name}.
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={`${packs.length} paket`}
                        sx={{
                            bgcolor: "rgba(114,216,255,0.16)",
                            color: "#72d8ff",
                            fontWeight: 900,
                        }}
                    />
                </Stack>
            </DashboardCard>

            {isLoading ? (
                <DashboardCard>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                        <CircularProgress size={22} sx={{ color: "#72d8ff" }} />
                        <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                            Memuat paket internet...
                        </Typography>
                    </Stack>
                </DashboardCard>
            ) : (
                <Grid container spacing={3}>
                    {packs.map((pack, index) => {
                        const accent = packageAccents[index % packageAccents.length];
                        const isPending = selectedPackageId === pack.id;
                        const isRecommended = recommendedPackage?.id === pack.id;

                        return (
                            <Grid key={pack.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                                <PackageBuyCard
                                    pack={pack}
                                    accent={accent}
                                    imageTheme={imageThemes[index % imageThemes.length]}
                                    isPending={isPending}
                                    isRecommended={isRecommended}
                                    onBuy={() => buyPackageMutation.mutate(pack)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {!isLoading && !packs.length && (
                <DashboardCard>
                    <EmptyPanel message="Belum ada paket internet yang tersedia." />
                </DashboardCard>
            )}
        </Stack>
    );
}

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
};
