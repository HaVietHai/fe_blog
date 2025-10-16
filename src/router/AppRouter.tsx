import { useRoutes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import PublicRouter from "./PublicRoutes";
import routes from "./app.routes";
import { Suspense } from "react";
import { PageLoader } from "../components/PageLoader";

export default function AppRouter() {
    const allRoutes = [
        {
            element: <AppLayout />,
            children: [
                ...routes.protected,
                ...routes.public,
                ...routes.redirect, // Logic luon dat cuoi
            ],
        }
    ];

    let element = useRoutes(allRoutes);
    return <Suspense fallback={<PageLoader/>}>{element}</Suspense>
}