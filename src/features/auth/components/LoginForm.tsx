import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useLoginMutation } from "../hooks";
import type { LoginPayload } from "../types/auth.types";
import { LoginIllustration } from "./LoginIllustration";

export function LoginForm() {
    const { control, handleSubmit } = useForm<LoginPayload>({
        defaultValues: { email: "admin@mail.com", password: "admin123" },
        mode: "onBlur",
    });

    const mutation = useLoginMutation();

    const onSubmit = (values: LoginPayload) => mutation.mutate(values);

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
                        spacing={2.25}
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ maxWidth: 340, mx: { xs: "auto", md: 0 } }}
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
                                    fontSize: { xs: 36, sm: 42 },
                                    fontWeight: 800,
                                    lineHeight: 1.05,
                                    letterSpacing: 0,
                                    m: 0,
                                }}
                            >
                                Halo,
                                <br />
                                Selamat Datang
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                    color: "rgba(255,255,255,0.68)",
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                }}
                            >
                                Masuk ke akun untuk melanjutkan pengelolaan
                                customer, paket internet, dan transaksi.
                            </Typography>
                        </Box>

                        {mutation.isError && (
                            <Alert severity="error">
                                {(mutation.error as Error).message}
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
                                    placeholder="stanley@gmail.com"
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

                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: -0.5,
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        size="small"
                                        sx={{
                                            p: 0.25,
                                            mr: 0.75,
                                            color: "#f6c400",
                                            "&.Mui-checked": {
                                                color: "#f6c400",
                                            },
                                        }}
                                    />
                                }
                                label="Ingat saya"
                                sx={{
                                    m: 0,
                                    "& .MuiFormControlLabel-label": {
                                        color: "rgba(255,255,255,0.68)",
                                        fontSize: 12,
                                    },
                                }}
                            />
                            <Link
                                component={RouterLink}
                                to="/forgot-password"
                                underline="none"
                                sx={{
                                    color: "#72d8ff",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                            >
                                Lupa kata sandi?
                            </Link>
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending}
                            sx={{
                                alignSelf: "flex-start",
                                mt: 4,
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
                            Masuk
                        </Button>

                        <Typography
                            sx={{
                                mt: { xs: 5, md: 9 },
                                color: "rgba(255,255,255,0.68)",
                                fontSize: 12,
                            }}
                        >
                            Belum punya akun?{" "}
                            <Link
                                component={RouterLink}
                                to="/signup"
                                underline="none"
                                sx={{ color: "#72d8ff", fontWeight: 800 }}
                            >
                                Daftar
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
