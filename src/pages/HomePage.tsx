import { Box } from "@mui/material";
import {
    AppSection,
    FiberSection,
    HeroSection,
    MainNav,
    PackageSection,
    TopBar,
} from "../features/home/components";

export function HomePage() {
    return (
        <Box sx={{ minHeight: "100dvh", bgcolor: "#f5f8fb", color: "#102331" }}>
            <TopBar />
            <MainNav />

            <Box
                component="main"
                sx={{
                    overflow: "hidden",
                    background:
                        "linear-gradient(180deg, #eef9ff 0%, #ffffff 42%, #f5f8fb 100%)",
                }}
            >
                <HeroSection />
                <FiberSection />
                <PackageSection />
                <AppSection />
            </Box>
        </Box>
    );
}

export default HomePage;
