import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthLayout } from "../../shared/layouts/AuthLayout";
import { DashboardLayout } from "../../shared/layouts/DashboardLayout";
import { ForgotPasswordPage } from "../../features/auth/pages/ForgotPasswordPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { HistoryTransactionsPage } from "../../features/history-transactions/pages";
import { BuyPackagePage } from "../../features/internet-packages/pages";
import { CustomerTransactionsPage } from "../../features/transactions/pages";
import { DashboardRouter } from "../../pages/DashboardRouter";
import { HomePage } from "../../pages/HomePage";

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <RegisterPage /> },
            { path: "/forgot-password", element: <ForgotPasswordPage /> },
        ],
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { path: "/dashboard", element: <DashboardRouter /> },
                    { path: "/dashboard/beli-paket", element: <BuyPackagePage /> },
                    { path: "/dashboard/transaksi", element: <CustomerTransactionsPage /> },
                    { path: "/dashboard/riwayat", element: <HistoryTransactionsPage /> },
                ],
            },
        ],
    },
]);
