import {  Suspense } from "react";
import AppRouter from "./AppRouter";
import { PageLoader } from "../components/PageLoader";

export default function PublicRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <AppRouter/>
        </Suspense>
    )
}