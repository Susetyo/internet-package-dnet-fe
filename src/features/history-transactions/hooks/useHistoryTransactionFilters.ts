import { useState } from "react";
import { getDefaultDateRange } from "../../../shared/utils";
import type {
    HistoryTransactionStatusFilter,
    UseHistoryTransactionFiltersReturn,
} from "../types";

export function useHistoryTransactionFilters(): UseHistoryTransactionFiltersReturn {
    const [defaultRange] = useState(getDefaultDateRange);
    const [startDate, setStartDate] = useState(defaultRange.start);
    const [endDate, setEndDate] = useState(defaultRange.end);
    const [status, setStatus] = useState<HistoryTransactionStatusFilter>("all");
    const [customerId, setCustomerId] = useState("all");
    const [packageId, setPackageId] = useState("all");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const resetPage = () => setPage(0);

    const updateCustomerId = (nextCustomerId: string) => {
        setCustomerId(nextCustomerId);
        resetPage();
    };

    const updatePackageId = (nextPackageId: string) => {
        setPackageId(nextPackageId);
        resetPage();
    };

    const updateStartDate = (nextStartDate: string) => {
        setStartDate(nextStartDate);
        resetPage();
    };

    const updateEndDate = (nextEndDate: string) => {
        setEndDate(nextEndDate);
        resetPage();
    };

    const updateStatus = (nextStatus: HistoryTransactionStatusFilter) => {
        setStatus(nextStatus);
        resetPage();
    };

    const updateRowsPerPage = (nextRowsPerPage: number) => {
        setRowsPerPage(nextRowsPerPage);
        setPage(0);
    };

    const resetFilters = () => {
        setStartDate(defaultRange.start);
        setEndDate(defaultRange.end);
        setStatus("all");
        setCustomerId("all");
        setPackageId("all");
        resetPage();
    };

    return {
        filters: {
            customerId,
            startDate,
            endDate,
            status,
            packageId,
        },
        pagination: {
            page,
            rowsPerPage,
        },
        actions: {
            setPage,
            updateCustomerId,
            updateEndDate,
            updatePackageId,
            updateRowsPerPage,
            updateStartDate,
            updateStatus,
            resetFilters,
        },
    };
}
