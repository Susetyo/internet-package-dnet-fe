import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { CloudUploadRounded } from "@mui/icons-material";
import { useState } from "react";
import type { PendingCustomerTransaction } from "../types/transaction.types";

type AdminManualPaymentPayload = {
    fileName: string;
    imageUrl: string;
};

type AdminManualPaymentDialogProps = {
    errorMessage: string;
    isSubmitting: boolean;
    open: boolean;
    transaction: PendingCustomerTransaction | null;
    onClose: () => void;
    onSubmit: (payload: AdminManualPaymentPayload) => void;
};

export function AdminManualPaymentDialog({
    errorMessage,
    isSubmitting,
    open,
    transaction,
    onClose,
    onSubmit,
}: AdminManualPaymentDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ color: "#102331", fontWeight: 900 }}>
                Manual Pembayaran Admin
            </DialogTitle>
            {open && (
                <AdminManualPaymentForm
                    errorMessage={errorMessage}
                    isSubmitting={isSubmitting}
                    transaction={transaction}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            )}
        </Dialog>
    );
}

function AdminManualPaymentForm({
    errorMessage,
    isSubmitting,
    transaction,
    onClose,
    onSubmit,
}: Omit<AdminManualPaymentDialogProps, "open">) {
    const [fileName, setFileName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [fileError, setFileError] = useState("");

    return (
        <>
            <DialogContent>
                <Stack
                    component="form"
                    id="admin-manual-payment-form"
                    spacing={2}
                    sx={{ pt: 1 }}
                    onSubmit={(event) => {
                        event.preventDefault();

                        if (!imageUrl || !fileName) {
                            setFileError("Upload gambar bukti pembayaran terlebih dahulu.");
                            return;
                        }

                        onSubmit({ fileName, imageUrl });
                    }}
                >
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    {fileError && <Alert severity="error">{fileError}</Alert>}
                    {transaction && (
                        <Alert severity="info">
                            Invoice {transaction.id} akan ditandai sukses setelah
                            bukti pembayaran disimpan.
                        </Alert>
                    )}

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadRounded />}
                        disabled={isSubmitting}
                        sx={{
                            alignSelf: "flex-start",
                            borderColor: "rgba(0,0,0,0.24)",
                            textTransform: "none",
                            fontWeight: 800,
                        }}
                    >
                        Upload Bukti Bayar
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={async (event) => {
                                const file = event.target.files?.[0];
                                if (!file) return;

                                if (!file.type.startsWith("image/")) {
                                    setFileError("File bukti pembayaran harus berupa gambar.");
                                    return;
                                }

                                try {
                                    const compressedImageUrl =
                                        await createCompressedImageDataUrl(file);
                                    setFileName(file.name);
                                    setImageUrl(compressedImageUrl);
                                    setFileError("");
                                } catch {
                                    setFileError("Gagal membaca file bukti pembayaran.");
                                }
                            }}
                        />
                    </Button>

                    {fileName && (
                        <Box
                            sx={{
                                border: "1px solid rgba(0,0,0,0.12)",
                                borderRadius: 1,
                                p: 1.5,
                            }}
                        >
                            <Typography sx={{ fontSize: 13, fontWeight: 800, mb: 1 }}>
                                {fileName}
                            </Typography>
                            <Box
                                component="img"
                                src={imageUrl}
                                alt="Bukti pembayaran"
                                sx={{
                                    width: "100%",
                                    maxHeight: 260,
                                    objectFit: "contain",
                                    borderRadius: 1,
                                    bgcolor: "#f6f8fb",
                                }}
                            />
                        </Box>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button onClick={onClose} disabled={isSubmitting}>
                    Batal
                </Button>
                <Button
                    type="submit"
                    form="admin-manual-payment-form"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ fontWeight: 800 }}
                >
                    {isSubmitting ? "Menyimpan..." : "Konfirmasi Sukses"}
                </Button>
            </DialogActions>
        </>
    );
}

function createCompressedImageDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const image = new Image();

            image.onload = () => {
                const maxSize = 900;
                const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
                const width = Math.max(1, Math.round(image.width * scale));
                const height = Math.max(1, Math.round(image.height * scale));
                const canvas = document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);

                let quality = 0.78;
                let dataUrl = canvas.toDataURL("image/jpeg", quality);

                while (dataUrl.length > 120_000 && quality > 0.38) {
                    quality -= 0.1;
                    dataUrl = canvas.toDataURL("image/jpeg", quality);
                }

                resolve(dataUrl);
            };
            image.onerror = reject;
            image.src = String(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
