import {
    ChatRounded,
    ChevronLeftRounded,
    ChevronRightRounded,
    WifiRounded,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useRef } from "react";
import type { InternetPackage } from "../../internet-packages/types/package.types";
import { usePackagesQuery } from "../../../shared/hooks";
import { formatCurrency } from "../../../shared/utils";

const sliderButtonSx = {
    width: 48,
    height: 48,
    bgcolor: "#fff",
    color: "#006bb6",
    border: "1px solid rgba(0,107,182,0.16)",
    boxShadow: "0 12px 32px rgba(0,107,182,0.14)",
    "&:hover": {
        bgcolor: "#006bb6",
        color: "#fff",
    },
};

export function PackageSection() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const {
        data: packages = [],
        isLoading,
        isError,
    } = usePackagesQuery();
    const scrollPackages = (direction: "left" | "right") => {
        sliderRef.current?.scrollBy({
            left: direction === "left" ? -430 : 430,
            behavior: "smooth",
        });
    };

    return (
        <Box
            id="paket"
            sx={{
                py: { xs: 6, md: 9 },
                bgcolor: "#eef9ff",
                borderTop: "1px solid rgba(0,107,182,0.08)",
                borderBottom: "1px solid rgba(0,107,182,0.08)",
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        mb: 3,
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "flex-end" },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography sx={{ color: "#006bb6", fontWeight: 900 }}>
                            Pilihan Paket
                        </Typography>
                        <Typography
                            component="h2"
                            sx={{
                                mt: 0.5,
                                color: "#111827",
                                fontSize: { xs: 32, md: 44 },
                                fontWeight: 950,
                            }}
                        >
                            Paket favorit untuk semua kebutuhan
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            aria-label="Paket sebelumnya"
                            onClick={() => scrollPackages("left")}
                            sx={sliderButtonSx}
                        >
                            <ChevronLeftRounded />
                        </IconButton>
                        <IconButton
                            aria-label="Paket berikutnya"
                            onClick={() => scrollPackages("right")}
                            sx={sliderButtonSx}
                        >
                            <ChevronRightRounded />
                        </IconButton>
                    </Stack>
                </Stack>

                {isLoading ? (
                    <Stack
                        sx={{
                            minHeight: 220,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                        <Typography
                            sx={{ mt: 2, color: "#637587", fontWeight: 800 }}
                        >
                            Memuat paket dari API...
                        </Typography>
                    </Stack>
                ) : isError ? (
                    <Alert severity="error">
                        Paket belum bisa dimuat. Pastikan json-server berjalan
                        di port 3001.
                    </Alert>
                ) : (
                    <Box
                        ref={sliderRef}
                        sx={{
                            display: "flex",
                            gap: 2.5,
                            overflowX: "auto",
                            scrollSnapType: "x mandatory",
                            scrollBehavior: "smooth",
                            pb: 1,
                            mx: { xs: -2, sm: 0 },
                            px: { xs: 2, sm: 0 },
                            "&::-webkit-scrollbar": { display: "none" },
                            scrollbarWidth: "none",
                        }}
                    >
                        {packages.map((item, index) => (
                            <PackageCard
                                key={item.id}
                                item={item}
                                highlight={index === 1}
                                imageIndex={index}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}

function PackageCard({
    item,
    highlight,
    imageIndex,
}: {
    item: InternetPackage;
    highlight: boolean;
    imageIndex: number;
}) {
    const speedLabel = getPackageSpeedLabel(item);
    const quotaLabel = item.quotaGb ? `${item.quotaGb} GB` : "Unlimited";
    const durationLabel =
        item.validityDays === 1 ? "1 hari" : `${item.validityDays} hari`;
    const imageUrl = getPackageImageUrl(item, imageIndex);
    const priceAmount = formatCurrency(item.price).replace("Rp", "").trim();
    const openLoginPage = () => {
        window.open("/login", "_blank", "noopener,noreferrer");
    };

    return (
        <Paper
            elevation={0}
            sx={{
                flex: "0 0 auto",
                width: { xs: 316, sm: 386, lg: 414 },
                overflow: "hidden",
                scrollSnapAlign: "start",
                borderRadius: 1,
                border: "1px solid rgba(0,107,182,0.14)",
                bgcolor: "#fff",
                boxShadow: highlight
                    ? "0 24px 70px rgba(0,107,182,0.18)"
                    : "0 12px 32px rgba(16,35,49,0.08)",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: 184,
                    overflow: "hidden",
                    bgcolor: "#006bb6",
                }}
            >
                <Box
                    component="img"
                    src={imageUrl}
                    alt=""
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(0,107,182,0.78), rgba(0,169,232,0.18))",
                    }}
                />
                <Paper
                    elevation={0}
                    sx={{
                        position: "absolute",
                        left: 24,
                        top: "50%",
                        transform: "translateY(-50%)",
                        px: 2,
                        py: 1.25,
                        borderRadius: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "rgba(255,255,255,0.92)",
                        color: "#006bb6",
                        fontWeight: 950,
                        fontSize: 38,
                        lineHeight: 1,
                    }}
                >
                    {speedLabel}
                    <WifiRounded sx={{ color: "#f6c400", fontSize: 28 }} />
                </Paper>
            </Box>

            <Stack spacing={2.2} sx={{ p: 3 }}>
                <Box sx={{ minHeight: 146, textAlign: "center" }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                        <Typography
                            sx={{
                                color: "#117fa5",
                                fontWeight: 950,
                                fontSize: 24,
                                lineHeight: 1.2,
                            }}
                        >
                            {item.name}
                        </Typography>
                        {highlight ? (
                            <Chip
                                size="small"
                                label="Terlaris"
                                sx={{
                                    bgcolor: "#f6c400",
                                    color: "#102331",
                                    fontWeight: 900,
                                }}
                            />
                        ) : null}
                    </Stack>
                    <Typography
                        sx={{
                            mt: 1.25,
                            color: "#117fa5",
                            fontSize: 18,
                            fontWeight: 950,
                        }}
                    >
                        {speedLabel}
                    </Typography>
                    <Typography
                        sx={{ mt: 2.25, fontSize: 15, color: "#465466" }}
                    >
                        Harga belum termasuk PPN 11%
                    </Typography>
                    <Typography
                        sx={{ mt: 0.75, color: "#6b7d90", fontSize: 13 }}
                    >
                        {item.provider} • Kuota {quotaLabel} • {durationLabel}
                    </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 20,
                            fontWeight: 950,
                            verticalAlign: "top",
                        }}
                    >
                        Rp
                    </Typography>
                    <Typography
                        component="span"
                        sx={{ ml: 0.75, fontSize: 34, fontWeight: 950 }}
                    >
                        {priceAmount}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            ml: 1,
                            color: "#465466",
                            fontSize: 17,
                            fontWeight: 800,
                        }}
                    >
                        / {item.validityDays === 1 ? "Hari" : "Bulan"}
                    </Typography>
                </Box>

                <Stack spacing={1.5}>
                    <Button
                        onClick={openLoginPage}
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.25,
                            borderRadius: 1,
                            bgcolor: "#006bb6",
                            fontSize: 16,
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#005894" },
                        }}
                    >
                        Langganan Sekarang
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<ChatRounded />}
                        sx={{
                            py: 1.1,
                            borderRadius: 1,
                            borderColor: "#d0d7e2",
                            color: "#364255",
                            fontSize: 16,
                            bgcolor: "#fff",
                        }}
                    >
                        Chat Sales
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

function getPackageImageUrl(pack: InternetPackage, index: number) {
    const seeds = [
        "family-wifi",
        "gaming-wifi",
        "home-streaming",
        "work-online",
        "business-fiber",
        "mobile-data",
    ];

    return `https://picsum.photos/seed/${seeds[index % seeds.length]}-${pack.id}/720/360`;
}

function getPackageSpeedLabel(pack: InternetPackage) {
    const speedMatch = pack.name.match(/(\d+\s*Mbps)/i);
    if (speedMatch) {
        return speedMatch[1].replace(/\s+/, " ");
    }

    return pack.quotaGb ? `${pack.quotaGb} GB` : "Unlimited";
}
