import { Navigate } from "react-router-dom";
import OtpProtectedRoute from "../router/guard/OtpProtectedRoute";

// Lazy load pages
import { lazy } from "react";
import ProtectedRouter from "./guard/ProtectedRouter";

const HomePage = lazy(() => import("../pages/Blog-Pages/HomePage"));
const ProfilePage = lazy(() => import("../pages/Blog-Pages/ProfilePage"));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegitserPage'));
const ForgetPasswordPage = lazy(() => import('../pages/ForgetPassword/ForgetPage'));
const ChangePasswordPage = lazy(() => import('../pages/ForgetPassword/ChangePassPage'));

let routes = {
  // 🧩 Các route yêu cầu login
  protected: [
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <HomePage />
        </ProtectedRouter>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRouter>
          <ProfilePage />
        </ProtectedRouter>
      ),
    },
    {
      path: "/change-password",
      element: (
        <OtpProtectedRoute>
          <ChangePasswordPage />
        </OtpProtectedRoute>
      ),
    },
  ],

  // 🧭 Các route public (ai cũng vào được)
  public: [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/forgot-password", element: <ForgetPasswordPage /> },
  ],

  // 🔁 Redirect logic
  redirect: [
    // Nếu người đã login mà vào /login → về home
    { path: "/login", element: <Navigate to="/" /> },
    // Route không tồn tại
    {
      path: "*",
      element: localStorage.getItem("token")
        ? <Navigate to="/" />
        : <Navigate to="/login" />,
    },
  ],
};

export default routes;
