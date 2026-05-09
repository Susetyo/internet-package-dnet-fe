import { MenuRounded, RouterRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";

export function MainNav() {
    const openLoginPage = () => {
        window.open("/login", "_blank", "noopener,noreferrer");
    };

    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 20,
                bgcolor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(18px)",
                borderBottom: "1px solid rgba(16,35,49,0.08)",
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    sx={{
                        minHeight: 76,
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1.25}
                        sx={{ alignItems: "center" }}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 1,
                                display: "grid",
                                placeItems: "center",
                                color: "#fff",
                                bgcolor: "#006bb6",
                                boxShadow: "0 14px 30px rgba(0,107,182,0.28)",
                            }}
                        >
                            <RouterRounded />
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 950, fontSize: 22 }}>
                                d~net
                            </Typography>
                            <Typography
                                sx={{
                                    mt: -0.5,
                                    color: "#637587",
                                    fontSize: 12,
                                    fontWeight: 800,
                                }}
                            >
                                Fiber Internet
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        component="nav"
                        direction="row"
                        spacing={3}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            color: "#435468",
                            fontWeight: 800,
                        }}
                    >
                        <Link href="#paket" color="inherit" underline="none">
                            Paket
                        </Link>
                        <Link href="#bantuan" color="inherit" underline="none">
                            Bantuan
                        </Link>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1.25}
                        sx={{ alignItems: "center" }}
                    >
                        <Button
                            onClick={openLoginPage}
                            variant="contained"
                            sx={{
                                bgcolor: "#8cc63f",
                                color: "#102331",
                                boxShadow: "0 14px 28px rgba(140,198,63,0.28)",
                                "&:hover": { bgcolor: "#7ab233" },
                            }}
                        >
                            Langganan
                        </Button>
                        <IconButton sx={{ display: { md: "none" } }}>
                            <MenuRounded />
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
