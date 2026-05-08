import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth.store";

export function ProtectedRoutes() {
    console.log(
        "Checking authentication...",
        useAuthStore.getState().isAuthenticated(),
    );
    return useAuthStore.getState().isAuthenticated() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}
