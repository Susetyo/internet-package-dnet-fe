import {
    ApartmentRounded,
    BusinessCenterRounded,
    HeadsetMicRounded,
    HomeRounded,
    LanguageRounded,
    PhoneIphoneRounded,
} from "@mui/icons-material";
import { Box, Container, Link, Stack } from "@mui/material";
import type { ReactNode } from "react";

export function TopBar() {
    const openLoginPage = () => {
        window.open("/login", "_blank", "noopener,noreferrer");
    };

    return (
        <Box sx={{ bgcolor: "#102331", color: "#d8f3ff", fontSize: 13 }}>
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    sx={{
                        minHeight: 42,
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <TopLink icon={<HomeRounded />} label="Residensial" />
                        <TopLink
                            icon={<ApartmentRounded />}
                            label="Apartemen"
                        />
                        <TopLink
                            icon={<BusinessCenterRounded />}
                            label="Bisnis"
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={{ xs: 1.5, sm: 2.5 }}
                        sx={{ alignItems: "center", ml: "auto" }}
                    >
                        <TopLink
                            icon={<PhoneIphoneRounded />}
                            label="Download App"
                        />
                        <TopLink icon={<HeadsetMicRounded />} label="Bantuan" />
                        <TopLink icon={<LanguageRounded />} label="ID" />
                        <Link
                            component="button"
                            type="button"
                            onClick={openLoginPage}
                            underline="none"
                            sx={{
                                color: "#fff",
                                cursor: "pointer",
                                font: "inherit",
                                fontWeight: 800,
                            }}
                        >
                            Login
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}

function TopLink({ icon, label }: { icon: ReactNode; label: string }) {
    return (
        <Stack
            component="span"
            direction="row"
            spacing={0.75}
            sx={{ alignItems: "center", whiteSpace: "nowrap" }}
        >
            <Box
                sx={{ display: "grid", fontSize: 0, "& svg": { fontSize: 17 } }}
            >
                {icon}
            </Box>
            <span>{label}</span>
        </Stack>
    );
}
