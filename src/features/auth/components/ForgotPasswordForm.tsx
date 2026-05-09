import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useResetPasswordMutation } from "../hooks";
import type { ForgotPasswordPayload } from "../types/auth.types";
import { LoginIllustration } from "./LoginIllustration";

type ForgotPasswordFormValues = ForgotPasswordPayload & {
    confirmPassword: string;
};

export function ForgotPasswordForm() {
    const { control, handleSubmit, reset } = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    const mutation = useResetPasswordMutation({ onSuccess: reset });

    const onSubmit = (values: ForgotPasswordFormValues) => {
        const payload: ForgotPasswordPayload = {
            email: values.email,
            password: values.password,
        };

        mutation.mutate(payload);
    };

    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                minHeight: { xs: "auto", md: "100dvh" },
                borderRadius: { xs: 1, md: 0 },
                overflow: "hidden",
                bgcolor: "transparent",
                boxShadow: {
                    xs: "none",
                    md: "none",
                },
                border: "none",
            }}
        >
            <CardContent
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
                    gap: 0,
                    p: { xs: 0, md: 0 },
                    minHeight: "inherit",
                    "&:last-child": { pb: 0 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: { xs: 1, sm: 5, md: 10, lg: 14 },
                        py: { xs: 4, md: 6 },
                        textAlign: "left",
                        bgcolor: "rgba(10, 21, 32, 0.72)",
                        backdropFilter: "blur(18px)",
                    }}
                >
                    <Stack
                        spacing={2.25}
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ maxWidth: 360, mx: { xs: "auto", md: 0 } }}
                    >
                        <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{
                                alignItems: "center",
                                mb: { xs: 4, md: 6 },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 9,
                                    height: 14,
                                    borderRadius: 0.75,
                                    background: "#f6c400",
                                    boxShadow:
                                        "0 0 18px rgba(246, 196, 0, 0.35)",
                                }}
                            />
                            <Typography
                                sx={{
                                    color: "#fff",
                                    fontSize: 13,
                                    fontWeight: 800,
                                }}
                            >
                                d~net
                            </Typography>
                        </Stack>

                        <Box>
                            <Typography
                                component="h1"
                                sx={{
                                    color: "#fff",
                                    fontSize: { xs: 34, sm: 40 },
                                    fontWeight: 800,
                                    lineHeight: 1.05,
                                    letterSpacing: 0,
                                    m: 0,
                                }}
                            >
                                Atur Ulang
                                <br />
                                Kata Sandi
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                    color: "rgba(255,255,255,0.68)",
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                }}
                            >
                                Masukkan email akun dan buat kata sandi baru
                                untuk masuk kembali ke dashboard.
                            </Typography>
                        </Box>

                        {mutation.isError && (
                            <Alert severity="error">
                                {(mutation.error as Error).message}
                            </Alert>
                        )}

                        {mutation.isSuccess && (
                            <Alert severity="success">
                                Kata sandi berhasil diperbarui. Silakan masuk
                                dengan kata sandi baru.
                            </Alert>
                        )}

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email wajib diisi",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Format email tidak valid",
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="email@contoh.com"
                                    type="email"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={fieldSx}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Kata sandi baru wajib diisi",
                                minLength: {
                                    value: 6,
                                    message: "Kata sandi minimal 6 karakter",
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="Kata sandi baru"
                                    type="password"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={fieldSx}
                                />
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: "Konfirmasi kata sandi wajib diisi",
                                validate: (value, formValues) =>
                                    value === formValues.password ||
                                    "Konfirmasi kata sandi tidak sama",
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="Konfirmasi kata sandi baru"
                                    type="password"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={fieldSx}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending}
                            sx={{
                                alignSelf: "flex-start",
                                mt: 2,
                                minWidth: 132,
                                height: 44,
                                borderRadius: 1.25,
                                textTransform: "none",
                                fontWeight: 800,
                                bgcolor: "#f6c400",
                                color: "#102331",
                                boxShadow:
                                    "0 12px 22px rgba(246, 196, 0, 0.24)",
                                "&:hover": { bgcolor: "#e5b600" },
                            }}
                        >
                            Simpan Password
                        </Button>

                        <Typography
                            sx={{
                                mt: { xs: 3, md: 6 },
                                color: "rgba(255,255,255,0.68)",
                                fontSize: 12,
                            }}
                        >
                            Ingat kata sandi?{" "}
                            <Link
                                component={RouterLink}
                                to="/login"
                                underline="none"
                                sx={{ color: "#72d8ff", fontWeight: 800 }}
                            >
                                Masuk
                            </Link>
                        </Typography>
                    </Stack>
                </Box>

                <LoginIllustration />
            </CardContent>
        </Card>
    );
}

const fieldSx = {
    "& .MuiInputBase-root": {
        height: 44,
        borderRadius: 1.5,
        bgcolor: "rgba(255,255,255,0.1)",
        fontSize: 13,
        color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.14)",
    },
    "& .MuiInputBase-input::placeholder": {
        color: "rgba(255,255,255,0.55)",
        opacity: 1,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(114,216,255,0.5)",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#72d8ff",
        borderWidth: 1,
    },
    "& .MuiFormHelperText-root": {
        mx: 0,
        fontSize: 11,
        color: "#ffb3c2",
    },
};
