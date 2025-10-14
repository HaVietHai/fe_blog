import { useRoutes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AppRoutes from '../router/app.routes'
import PublicRouter from "./PublicRoutes";

export default function AppRouter() {
    let routes = [
        {
            element: <AppLayout />,
            children: [
                {
                    path: '*',
                    element: <PublicRouter />
                }
            ],
        }
    ];

    let element = useRoutes(routes);
    return element;
}