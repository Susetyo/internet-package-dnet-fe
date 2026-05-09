import { CheckCircleRounded } from "@mui/icons-material";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { useAuthStore } from "../../auth/store/auth.store";
import {
    AdminBuyPackageSubmit,
    AdminCustomerSelector,
    AdminPackageSelection,
} from "../components";
import { useAdminBuyPackageForm } from "../hooks";

export function AdminBuyPackagePage() {
    const user = useAuthStore((state) => state.user);
    const {
        customers,
        packs,
        selectedCustomer,
        selectedPackage,
        selectedCustomerId,
        selectedPackageId,
        successMessage,
        isCustomersLoading,
        isLoading,
        hasError,
        isSubmitError,
        isSubmitting,
        canSubmit,
        selectCustomer,
        selectPackage,
        submitPurchase,
    } = useAdminBuyPackageForm();

    if (user?.role !== "admin") {
        return (
            <Alert severity="error">
                Halaman beli paket admin hanya bisa diakses oleh role admin.
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {hasError && (
                <Alert severity="error">
                    Gagal mengambil data customer atau paket dari json-server.
                    Pastikan `pnpm server` berjalan di port 3001.
                </Alert>
            )}
            {isSubmitError && (
                <Alert severity="error">
                    Pembelian paket gagal diproses. Coba lagi beberapa saat.
                </Alert>
            )}
            {successMessage && (
                <Alert icon={<CheckCircleRounded fontSize="inherit" />} severity="success">
                    {successMessage}
                </Alert>
            )}

            <Box>
                <Typography
                    component="h1"
                    sx={{
                        color: "#fff",
                        fontSize: { xs: 24, md: 28 },
                        fontWeight: 900,
                        letterSpacing: 0,
                        m: 0,
                    }}
                >
                    Beli Paket Customer
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                    Admin dapat memilih customer, memilih paket internet, lalu
                    membuat transaksi pembelian baru.
                </Typography>
            </Box>

            <AdminCustomerSelector
                customers={customers}
                selectedCustomer={selectedCustomer}
                selectedCustomerId={selectedCustomerId}
                isLoading={isCustomersLoading}
                onSelectCustomer={selectCustomer}
            />

            <AdminPackageSelection
                packs={packs}
                selectedPackage={selectedPackage}
                selectedPackageId={selectedPackageId}
                isLoading={isLoading}
                disabled={isSubmitting}
                onSelectPackage={selectPackage}
            />

            <AdminBuyPackageSubmit
                canSubmit={canSubmit}
                isPending={isSubmitting}
                onSubmit={submitPurchase}
            />
        </Stack>
    );
}
