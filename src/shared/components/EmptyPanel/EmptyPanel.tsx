import { ReceiptLongRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export function EmptyPanel({ message }: { message: string }) {
    return (
        <Box
            sx={{
                py: 5,
                textAlign: "center",
                color: "rgba(255,255,255,0.62)",
            }}
        >
            <ReceiptLongRounded sx={{ fontSize: 36, mb: 1, opacity: 0.5 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 900 }}>
                {message}
            </Typography>
        </Box>
    );
}
