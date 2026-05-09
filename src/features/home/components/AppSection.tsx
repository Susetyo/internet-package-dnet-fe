import { CheckCircleRounded, PhoneIphoneRounded } from "@mui/icons-material";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";

export function AppSection() {
    return (
        <Container id="bantuan" maxWidth="xl" sx={{ py: { xs: 6, md: 9 } }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 1.5,
                    overflow: "hidden",
                    position: "relative",
                    color: "#fff",
                    bgcolor: "#006bb6",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.14,
                        backgroundImage:
                            "linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)",
                        backgroundSize: "34px 34px",
                    }}
                />
                <Grid
                    container
                    spacing={3}
                    sx={{ position: "relative", alignItems: "center" }}
                >
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Stack spacing={1.5}>
                            <Typography
                                component="h2"
                                sx={{
                                    fontSize: { xs: 30, md: 42 },
                                    fontWeight: 950,
                                }}
                            >
                                Kelola langganan, tagihan, dan bantuan dalam
                                satu tempat
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.78)",
                                    lineHeight: 1.75,
                                    maxWidth: 680,
                                }}
                            >
                                Section penutup mengikuti pola homepage ISP:
                                promosi app, kanal bantuan, dan CTA untuk
                                pelanggan baru.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.5}
                            sx={{ justifyContent: { md: "flex-end" } }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<PhoneIphoneRounded />}
                                sx={{
                                    bgcolor: "#fff",
                                    color: "#006bb6",
                                    "&:hover": { bgcolor: "#edfaff" },
                                }}
                            >
                                Download App
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<CheckCircleRounded />}
                                sx={{
                                    borderColor: "rgba(255,255,255,0.55)",
                                    color: "#fff",
                                }}
                            >
                                Cek Pesanan
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
