import {
    ArrowForwardRounded,
    RouterRounded,
} from "@mui/icons-material";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";

export function HeroSection() {
    return (
        <Box sx={{ pt: { xs: 4, md: 7 }, pb: { xs: 6, md: 9 } }}>
            <Container maxWidth="xl">
                <Grid
                    container
                    spacing={{ xs: 4, md: 6 }}
                    sx={{ alignItems: "center" }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2.5}>
                            <Typography
                                component="h1"
                                sx={{
                                    color: "#102331",
                                    fontSize: { xs: 42, md: 64 },
                                    lineHeight: 1,
                                    fontWeight: 950,
                                    maxWidth: 660,
                                }}
                            >
                                Internet fiber cepat untuk rumah yang selalu
                                online
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#526476",
                                    fontSize: { xs: 17, md: 19 },
                                    lineHeight: 1.7,
                                    maxWidth: 590,
                                }}
                            >
                                Streaming, kerja, belajar, dan gaming berjalan
                                lebih stabil dengan paket DNET unlimited dan
                                dukungan teknis responsif.
                            </Typography>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                sx={{ pt: 1 }}
                            >
                                <Button
                                    size="large"
                                    variant="contained"
                                    endIcon={<ArrowForwardRounded />}
                                    sx={{
                                        bgcolor: "#006bb6",
                                        px: 3,
                                        py: 1.35,
                                        "&:hover": { bgcolor: "#005894" },
                                    }}
                                >
                                    Pilih Paket
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <HeroVisual />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

function HeroVisual() {
    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                minHeight: { xs: 360, md: 520 },
                overflow: "hidden",
                borderRadius: 1.5,
                bgcolor: "#102331",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "0 34px 80px rgba(16,35,49,0.2)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(0,107,182,0.95), rgba(0,169,232,0.72)), radial-gradient(circle at 80% 16%, rgba(246,196,0,0.5), transparent 26%)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 28,
                    border: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: 1,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: { xs: 210, md: 280 },
                    height: { xs: 210, md: 280 },
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.18)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: { xs: 132, md: 164 },
                    height: { xs: 132, md: 164 },
                    transform: "translate(-50%, -50%)",
                    borderRadius: 1.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#fff",
                    color: "#006bb6",
                    boxShadow: "0 30px 70px rgba(0,0,0,0.2)",
                    "& svg": { fontSize: { xs: 76, md: 92 } },
                }}
            >
                <RouterRounded />
            </Box>
            {[
                ["100 Mbps", "top", "8%", "left", "10%"],
                ["Unlimited", "top", "18%", "right", "8%"],
                ["Low latency", "bottom", "15%", "left", "8%"],
                ["24/7 Help", "bottom", "9%", "right", "12%"],
            ].map(([label, yProp, y, xProp, x]) => (
                <Paper
                    key={label}
                    elevation={0}
                    sx={{
                        position: "absolute",
                        [yProp]: y,
                        [xProp]: x,
                        px: 2,
                        py: 1.25,
                        borderRadius: 1,
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.16)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(14px)",
                        fontWeight: 900,
                    }}
                >
                    {label}
                </Paper>
            ))}
        </Paper>
    );
}
