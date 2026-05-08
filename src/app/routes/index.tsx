import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthLayout } from "../../shared/layouts/AuthLayout";
import { DashboardLayout } from "../../shared/layouts/DashboardLayout";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { DashboardPage } from "../../pages/DashboardPage";

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    {
        element: <AuthLayout />,
        children: [{ path: "/login", element: <LoginPage /> }],
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <DashboardLayout />,
                children: [{ path: "/dashboard", element: <DashboardPage /> }],
            },
        ],
    },
]);
