import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { PageLoader } from "../components/PageLoader";

// Import các layouts và routes
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout"; // Layout mới cho trang auth
import routes from "./app.routes";

export default function AppRouter() {
    const element = useRoutes([
        // Nhóm 1: Các route CÓ AppLayout (dành cho người dùng đã đăng nhập)
        {
            element: <AppLayout />,
            children: routes.protected,
        },
        // Nhóm 2: Các route KHÔNG CÓ AppLayout (dành cho login, register...)
        {
            element: <AuthLayout />,
            children: routes.public,
        },
        // Nhóm 3: Các route redirect/wildcard toàn cục, luôn đặt ở cuối cùng
        ...routes.redirect,
    ]);

    return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

