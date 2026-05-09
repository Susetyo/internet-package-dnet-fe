import { useAuthStore } from "../features/auth/store/auth.store";
import { CustomerDashboardPage } from "./CustomerDashboardPage";
import { DashboardPage } from "./DashboardPage";

export function DashboardRouter() {
    const user = useAuthStore((state) => state.user);

    if (user?.role === "customer") {
        return <CustomerDashboardPage />;
    }

    return <DashboardPage />;
}
