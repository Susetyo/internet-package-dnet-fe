import { Box, Typography } from "@mui/material";
export function PageHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h5">{title}</Typography>
            {subtitle && (
                <Typography color="text.secondary">{subtitle}</Typography>
            )}
        </Box>
    );
}
