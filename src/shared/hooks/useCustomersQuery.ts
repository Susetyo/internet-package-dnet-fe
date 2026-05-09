import { useQuery } from "@tanstack/react-query";
import { customersApi } from "../../features/customers/api/customers.api";

export const customersQueryKey = ["customers"] as const;

export function useCustomersQuery() {
    return useQuery({
        queryKey: customersQueryKey,
        queryFn: customersApi.getAll,
    });
}

export function useCustomerQuery(customerId?: string) {
    return useQuery({
        queryKey: ["customer", customerId],
        queryFn: () => customersApi.getById(customerId ?? ""),
        enabled: Boolean(customerId),
    });
}
