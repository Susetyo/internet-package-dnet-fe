import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const benefits = [
    ["100%", "Fiber optic"],
    ["1 : 1", "Download dan upload simetris"],
    ["Unlimited", "Tanpa batas kuota bulanan"],
];

export function FiberSection() {
    return (
        <Box sx={{ bgcolor: "#102331", color: "#fff", py: { xs: 6, md: 9 } }}>
            <Container maxWidth="xl">
                <Grid container spacing={4} sx={{ alignItems: "center" }}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: { xs: 32, md: 46 },
                                fontWeight: 950,
                            }}
                        >
                            Nikmati WiFi rumah fiber ultra cepat dan unlimited
                        </Typography>
                        <Typography
                            sx={{
                                mt: 2,
                                color: "rgba(255,255,255,0.72)",
                                lineHeight: 1.75,
                            }}
                        >
                            Struktur section ini mengikuti alur homepage ISP:
                            headline benefit, bukti performa, lalu ajakan cek
                            ketersediaan area.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            {benefits.map(([value, label]) => (
                                <Grid key={label} size={{ xs: 12, sm: 4 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            height: "100%",
                                            borderRadius: 1,
                                            bgcolor: "rgba(255,255,255,0.08)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            color: "#fff",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#f6c400",
                                                fontSize: 34,
                                                fontWeight: 950,
                                            }}
                                        >
                                            {value}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mt: 1,
                                                color: "rgba(255,255,255,0.72)",
                                            }}
                                        >
                                            {label}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
