import type { InternetPackage } from "../../internet-packages/types/package.types";
import type {
    Transaction,
    TransactionStatus,
} from "../../transactions/types/transaction.types";

export type HistoryTransactionStatusFilter = TransactionStatus | "all";

export type HistoryTransactionFilterState = {
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
    packages: InternetPackage[];
    isResetDisabled: boolean;
    onPackageIdChange: (packageId: string) => void;
    onStartDateChange: (startDate: string) => void;
    onEndDateChange: (endDate: string) => void;
    onStatusChange: (status: HistoryTransactionStatusFilter) => void;
    onReset: () => void;
};

export type HistoryTransactionTableProps = HistoryTransactionPaginationState & {
    transactions: Transaction[];
    packageById: Map<string, InternetPackage>;
    totalSuccessSpend: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
};
