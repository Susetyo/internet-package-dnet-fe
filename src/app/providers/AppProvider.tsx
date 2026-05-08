import type { PropsWithChildren } from "react";
import { QueryProvider } from "./QueryProvider";
import { AppThemeProvider } from "./ThemeProvider";

export function AppProvider({ children }: PropsWithChildren) {
    return (
        <AppThemeProvider>
            <QueryProvider>{children}</QueryProvider>
        </AppThemeProvider>
    );
}
