import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { PageLoader } from "../components/PageLoader";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import routes from "./app.routes";
import { useScrollRestore } from "../hook/useScrollRestore";

export default function AppRouter() {
  useScrollRestore(); // Gắn logic scroll toàn cục

  const element = useRoutes([
    {
      element: <AppLayout />,
      children: routes.protected,
    },
    {
      element: <AuthLayout />,
      children: routes.public,
    },
    ...routes.redirect,
  ]);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}
