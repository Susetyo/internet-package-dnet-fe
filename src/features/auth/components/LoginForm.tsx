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
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import type { LoginPayload } from "../types/auth.types";
import { LoginIllustration } from "./LoginIllustration";

export function LoginForm() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const { control, handleSubmit } = useForm<LoginPayload>({
        defaultValues: { email: "admin@mail.com", password: "admin123" },
        mode: "onBlur",
    });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            setUser(user);
            navigate("/dashboard");
        },
    });

    const onSubmit = (values: LoginPayload) => mutation.mutate(values);

    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                minHeight: { xs: "auto", md: "100dvh" },
                borderRadius: { xs: 4, md: 0 },
                overflow: "hidden",
                bgcolor: "#fff",
                boxShadow: {
                    xs: "0 28px 70px rgba(20, 20, 20, 0.14)",
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
                                    background:
                                        "linear-gradient(180deg, #00a9e8 0%, #006bb6 100%)",
                                }}
                            />
                            <Typography
                                sx={{
                                    color: "#15131b",
                                    fontSize: 13,
                                    fontWeight: 800,
                                }}
                            >
                                D~net
                            </Typography>
                        </Stack>

                        <Box>
                            <Typography
                                component="h1"
                                sx={{
                                    color: "#005aa8",
                                    fontSize: { xs: 36, sm: 42 },
                                    fontWeight: 800,
                                    lineHeight: 1.05,
                                    letterSpacing: 0,
                                    m: 0,
                                }}
                            >
                                Hello,
                                <br />
                                Welcome Back
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 2,
                                    color: "#8d8b94",
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                }}
                            >
                                Hey, welcome back to your account. Let’s
                                continue where you left off
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
                                required: "Password wajib diisi",
                                minLength: {
                                    value: 6,
                                    message: "Password minimal 6 karakter",
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    placeholder="Password"
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
                                            color: "#0079c8",
                                            "&.Mui-checked": {
                                                color: "#0079c8",
                                            },
                                        }}
                                    />
                                }
                                label="Remember me"
                                sx={{
                                    m: 0,
                                    "& .MuiFormControlLabel-label": {
                                        color: "#8d8b94",
                                        fontSize: 12,
                                    },
                                }}
                            />
                            <Link
                                href="#"
                                underline="none"
                                sx={{
                                    color: "#77737e",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                            >
                                Forgot Password?
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
                                bgcolor: "#006fba",
                                boxShadow:
                                    "0 12px 22px rgba(0, 111, 186, 0.24)",
                                "&:hover": { bgcolor: "#005a9d" },
                            }}
                        >
                            Sign In
                        </Button>

                        <Typography
                            sx={{
                                mt: { xs: 5, md: 9 },
                                color: "#77737e",
                                fontSize: 12,
                            }}
                        >
                            Don&apos;t have an account?{" "}
                            <Link
                                href="#"
                                underline="none"
                                sx={{ color: "#0079c8", fontWeight: 800 }}
                            >
                                Sign Up
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
        borderRadius: 1,
        bgcolor: "#fff",
        fontSize: 13,
        color: "#19191f",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d5d3d9",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#bcb8c4",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0079c8",
        borderWidth: 1,
    },
    "& .MuiFormHelperText-root": {
        mx: 0,
        fontSize: 11,
    },
};
