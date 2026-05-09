import type { InternetPackage } from "../../internet-packages/types/package.types";
import type { Customer } from "../../customers/types/customer.types";
import type {
    Transaction,
    TransactionStatus,
} from "../../transactions/types/transaction.types";

export type HistoryTransactionStatusFilter = TransactionStatus | "all";

export type HistoryTransactionFilterState = {
    customerId: string;
    packageId: string;
    startDate: string;
    endDate: string;
    status: HistoryTransactionStatusFilter;
};

export type HistoryTransactionPaginationState = {
    page: number;
    rowsPerPage: number;
};

export type HistoryTransactionFilterActions = {
    setPage: (page: number) => void;
    updateCustomerId: (customerId: string) => void;
    updatePackageId: (packageId: string) => void;
    updateStartDate: (startDate: string) => void;
    updateEndDate: (endDate: string) => void;
    updateStatus: (status: HistoryTransactionStatusFilter) => void;
    updateRowsPerPage: (rowsPerPage: number) => void;
    resetFilters: () => void;
};

export type UseHistoryTransactionFiltersReturn = {
    filters: HistoryTransactionFilterState;
    pagination: HistoryTransactionPaginationState;
    actions: HistoryTransactionFilterActions;
};

export type HistoryTransactionFiltersProps = HistoryTransactionFilterState & {
    customers: Customer[];
    packages: InternetPackage[];
    showCustomerFilter?: boolean;
    isResetDisabled: boolean;
    onCustomerIdChange: (customerId: string) => void;
    onPackageIdChange: (packageId: string) => void;
    onStartDateChange: (startDate: string) => void;
    onEndDateChange: (endDate: string) => void;
    onStatusChange: (status: HistoryTransactionStatusFilter) => void;
    onReset: () => void;
};

export type HistoryTransactionTableProps = HistoryTransactionPaginationState & {
    transactions: Transaction[];
    customerById?: Map<string, Customer>;
    packageById: Map<string, InternetPackage>;
    totalSuccessSpend: number;
    isLoading: boolean;
    title?: string;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
};
