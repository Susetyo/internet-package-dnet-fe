import { Card, CardContent, Typography } from "@mui/material";

export function StatCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <Card
            elevation={0}
            sx={{ border: "1px solid", borderColor: "divider" }}
        >
            <CardContent>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>
                <Typography variant="h6">{value}</Typography>
            </CardContent>
        </Card>
    );
}
