import { useMemo, useState } from "react";
import { useCustomersQuery, usePackagesQuery } from "../../../shared/hooks";
import { useBuyPackageMutation } from "./useBuyPackageMutation";
import type { UseAdminBuyPackageFormResult } from "../types/admin-buy-package.types";

export function useAdminBuyPackageForm(): UseAdminBuyPackageFormResult {
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [selectedPackageId, setSelectedPackageId] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        data: customers = [],
        isLoading: isCustomersLoading,
        isError: isCustomersError,
    } = useCustomersQuery();
    const {
        data: packs = [],
        isLoading: isPackagesLoading,
        isError: isPackagesError,
    } = usePackagesQuery();

    const selectedCustomer = useMemo(
        () => customers.find((customer) => customer.id === selectedCustomerId),
        [customers, selectedCustomerId],
    );
    const selectedPackage = useMemo(
        () => packs.find((pack) => pack.id === selectedPackageId),
        [packs, selectedPackageId],
    );

    const buyPackageMutation = useBuyPackageMutation({
        customerId: selectedCustomerId,
        onMutate: () => {
            setSuccessMessage("");
        },
        onSuccess: (pack) => {
            setSuccessMessage(
                `${pack.name} berhasil dibuat untuk ${selectedCustomer?.name ?? "customer terpilih"}.`,
            );
            setSelectedPackageId("");
        },
    });

    const isLoading = isCustomersLoading || isPackagesLoading;
    const hasError = isCustomersError || isPackagesError;
    const canSubmit =
        Boolean(selectedCustomerId) &&
        Boolean(selectedPackage) &&
        !buyPackageMutation.isPending;

    return {
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
        isSubmitError: buyPackageMutation.isError,
        isSubmitting: buyPackageMutation.isPending,
        canSubmit,
        selectCustomer: (customerId) => {
            setSelectedCustomerId(customerId);
            setSuccessMessage("");
        },
        selectPackage: (packageId) => {
            setSelectedPackageId(packageId);
            setSuccessMessage("");
        },
        submitPurchase: () => {
            if (!selectedPackage || !selectedCustomerId) return;
            buyPackageMutation.mutate(selectedPackage);
        },
    };
}
