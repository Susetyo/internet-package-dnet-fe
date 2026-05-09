import { useState } from "react";
import type { TransactionStatusFilter } from "../types";
import { getDefaultDateRange } from "../utils";

export function useTransactionFilters() {
    const [defaultRange] = useState(getDefaultDateRange);
    const [startDate, setStartDate] = useState(defaultRange.start);
    const [endDate, setEndDate] = useState(defaultRange.end);
    const [status, setStatus] = useState<TransactionStatusFilter>("all");

    const resetFilters = () => {
        setStartDate(defaultRange.start);
        setEndDate(defaultRange.end);
        setStatus("all");
    };

    return {
        defaultRange,
        endDate,
        resetFilters,
        setEndDate,
        setStartDate,
        setStatus,
        startDate,
        status,
    };
}
