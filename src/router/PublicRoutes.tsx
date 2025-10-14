import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import('../pages/blog-pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegitserPage = lazy(() => import('../pages/RegitserPage'))

export default function PublicRouter() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/regitser" element={<RegitserPage />} />
        </Routes>
    )
}