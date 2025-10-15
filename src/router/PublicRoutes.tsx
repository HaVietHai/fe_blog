import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProjectedRouter from "./guard/ProjectedRouter";
import { PageLoader } from "../components/PageLoader";

const HomePage = lazy(() => import('../pages/blog-pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegitserPage = lazy(() => import('../pages/RegitserPage'))

export default function PublicRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>

                {/* Public route */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/regitser" element={<RegitserPage />} />

                {/* Projected route */}
                <Route path="/" element={
                    <ProjectedRouter>
                        <HomePage/>
                    </ProjectedRouter>
                } />

            </Routes>
        </Suspense>
    )
}