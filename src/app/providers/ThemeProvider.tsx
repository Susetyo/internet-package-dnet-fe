import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from "@mui/material";
import type { PropsWithChildren } from "react";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#3B5BFF" },
        background: { default: "#F7F8FC" },
    },
    shape: { borderRadius: 18 },
    typography: {
        fontFamily: "Inter, Manrope, system-ui, sans-serif",
        h5: { fontWeight: 800 },
        h6: { fontWeight: 800 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 14,
                    fontWeight: 700,
                },
            },
        },
        MuiCard: { styleOverrides: { root: { borderRadius: 24 } } },
    },
});

export function AppThemeProvider({ children }: PropsWithChildren) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
