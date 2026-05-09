import type { Customer } from "../../customers/types/customer.types";
import type { InternetPackage } from "./package.types";

export type AdminCustomerSelectorProps = {
    customers: Customer[];
    selectedCustomer?: Customer;
    selectedCustomerId: string;
    isLoading: boolean;
    onSelectCustomer: (customerId: string) => void;
};

export type AdminPackageSelectionProps = {
    packs: InternetPackage[];
    selectedPackage?: InternetPackage;
    selectedPackageId: string;
    isLoading: boolean;
    disabled: boolean;
    onSelectPackage: (packageId: string) => void;
};

export type SelectablePackageCardProps = {
    pack: InternetPackage;
    accent: string;
    selected: boolean;
    disabled: boolean;
    onSelect: () => void;
};

export type AdminBuyPackageSubmitProps = {
    canSubmit: boolean;
    isPending: boolean;
    onSubmit: () => void;
};

export type UseAdminBuyPackageFormResult = {
    customers: Customer[];
    packs: InternetPackage[];
    selectedCustomer?: Customer;
    selectedPackage?: InternetPackage;
    selectedCustomerId: string;
    selectedPackageId: string;
    successMessage: string;
    isCustomersLoading: boolean;
    isLoading: boolean;
    hasError: boolean;
    isSubmitError: boolean;
    isSubmitting: boolean;
    canSubmit: boolean;
    selectCustomer: (customerId: string) => void;
    selectPackage: (packageId: string) => void;
    submitPurchase: () => void;
};
