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
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import type { RegisterPayload } from "../types/auth.types";
import { LoginIllustration } from "./LoginIllustration";

type RegisterFormValues = RegisterPayload & {
    confirmPassword: string;
};

export function RegisterForm() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const { control, handleSubmit } = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (user) => {
            setUser(user);
            navigate("/dashboard");
        },
    });

    const onSubmit = (values: RegisterFormValues) => {
        const payload: RegisterPayload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
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
                borderRadius: { xs: 4, md: 0 },
                overflow: "hidden",
                bgcolor: "transparent",
                boxShadow: {
                    xs: "0 28px 70px rgba(0, 0, 0, 0.3)",
                    md: "none",
                },
                border: {
                    xs: "1px solid rgba(255, 255, 255, 0.8)",
                    md: "none",
                },
            }}
        >
            <CardContent
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
                    gap: 0,
                    p: { xs: 2, sm: 3, md: 0 },
                    minHeight: "inherit",
                    "&:last-child": { pb: { xs: 2, sm: 3, md: 0 } },
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
                        spacing={2}
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
                                mb: { xs: 3, md: 4 },
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
                                Buat Akun
                                <br />
                                Baru
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                    color: "rgba(255,255,255,0.68)",
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                }}
                            >
                                Daftar sebagai customer untuk melihat paket,
                                transaksi, dan status layanan internet.
                            </Typography>
                        </Box>

                        {mutation.isError && (
                            <Alert severity="error">
                                {(mutation.error as Error).message}
                            </Alert>
                        )}

                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Nama wajib diisi" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="Nama lengkap"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={fieldSx}
                                />
                            )}
                        />

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
                            name="phone"
                            control={control}
                            rules={{ required: "Nomor telepon wajib diisi" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="Nomor telepon"
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
                                required: "Kata sandi wajib diisi",
                                minLength: {
                                    value: 6,
                                    message: "Kata sandi minimal 6 karakter",
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="Kata sandi"
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
                                    placeholder="Konfirmasi kata sandi"
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
                                minWidth: 112,
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
                            Daftar
                        </Button>

                        <Typography
                            sx={{
                                mt: { xs: 3, md: 5 },
                                color: "rgba(255,255,255,0.68)",
                                fontSize: 12,
                            }}
                        >
                            Sudah punya akun?{" "}
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
