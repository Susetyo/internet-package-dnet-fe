import { Box, Typography } from "@mui/material";
export function EmptyState({ message }: { message: string }) {
    return (
        <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">{message}</Typography>
        </Box>
    );
}
