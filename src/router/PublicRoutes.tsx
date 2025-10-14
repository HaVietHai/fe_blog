import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const WelcomePage = lazy(() => import('../pages/WelcomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegitserPage = lazy(() => import('../pages/RegitserPage'))

export default function PublicRouter() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/regitser" element={<RegitserPage />} />
        </Routes>
    )
}