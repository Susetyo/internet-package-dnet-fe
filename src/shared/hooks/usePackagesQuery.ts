import { useQuery } from "@tanstack/react-query";
import { packagesApi } from "../../features/internet-packages/api/packages.api";

export const packagesQueryKey = ["packages"] as const;

export function usePackagesQuery() {
    return useQuery({
        queryKey: packagesQueryKey,
        queryFn: packagesApi.getAll,
    });
}
