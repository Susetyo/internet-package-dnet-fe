import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../../App";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthLayout } from "../../shared/layouts/AuthLayout";
import { DashboardLayout } from "../../shared/layouts/DashboardLayout";
import { LoginPage } from "../../features/auth/pages/LoginPage";

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
                children: [{ path: "/dashboard", element: <Home /> }],
            },
        ],
    },
]);
