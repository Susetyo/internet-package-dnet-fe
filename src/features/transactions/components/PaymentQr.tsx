import { Box } from "@mui/material";

type PaymentQrProps = {
    value: string;
};

const gridSize = 13;

export function PaymentQr({ value }: PaymentQrProps) {
    const cells = Array.from({ length: gridSize * gridSize }, (_, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const charCode = value.charCodeAt(index % value.length) || 0;
        const finder =
            (row < 4 && col < 4) ||
            (row < 4 && col > gridSize - 5) ||
            (row > gridSize - 5 && col < 4);

        return finder || (charCode + row * 7 + col * 11 + index) % 3 === 0;
    });

    return (
        <Box
            sx={{
                width: 220,
                height: 220,
                mx: "auto",
                p: 1.5,
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gap: 0.5,
                bgcolor: "#fff",
                borderRadius: 1,
            }}
        >
            {cells.map((active, index) => (
                <Box
                    key={index}
                    sx={{
                        bgcolor: active ? "#102331" : "#fff",
                        borderRadius: active ? 0.25 : 0,
                    }}
                />
            ))}
        </Box>
    );
}
