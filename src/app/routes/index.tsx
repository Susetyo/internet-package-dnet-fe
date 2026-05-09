import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthLayout } from "../../shared/layouts/AuthLayout";
import { DashboardLayout } from "../../shared/layouts/DashboardLayout";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { DashboardRouter } from "../../pages/DashboardRouter";
import { HomePage } from "../../pages/HomePage";

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
        element: <AuthLayout />,
        children: [{ path: "/login", element: <LoginPage /> }],
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { path: "/dashboard", element: <DashboardRouter /> },
                ],
            },
        ],
    },
]);
