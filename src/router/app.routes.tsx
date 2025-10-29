import { Navigate } from "react-router-dom";
// ĐÃ SỬA: Đường dẫn đến các file guard phải bắt đầu từ thư mục hiện tại `./`
import OtpProtectedRoute from "./guard/OtpProtectedRoute";
import ProtectedRouter from "./guard/ProtectedRouter";
// Giả định thư mục 'constants' nằm ngoài thư mục 'router' (ví dụ: src/constants)
import { MENU_ITEMS } from "../constants/menuItem.constant";
import { lazy, type JSX } from "react";
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant";

// --- Lazy load pages ---
// LƯU Ý: Hãy chắc chắn rằng tên file và đường dẫn là chính xác.
// Ví dụ: `RegitserPage` có thể là lỗi chính tả của `RegisterPage`.
const ServerDownPage = lazy(() => import("../pages/ServerDownPage"));
const HomeLayout = lazy(() => import("../pages/Blog-Pages/Layout/HomeLayout"));
const ProfilePage = lazy(() => import("../pages/Blog-Pages/ProfilePage"));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage'));
const RegisterPage = lazy(() => import('../pages/RegitserPage')); // KIỂM TRA LẠI TÊN FILE NÀY
const ForgetPasswordPage = lazy(() => import('../pages/ForgetPassword/ForgetPage'));
const ChangePasswordPage = lazy(() => import('../pages/ForgetPassword/ChangePassPage'));
const FeedPage = lazy(() => import('../pages/FeedPage'));
const ExplorePage = lazy(() => import('../pages/Blog-Pages/ExplorePage'));
const NotificationPage = lazy(() => import('../pages/Blog-Pages/NotificationPage'));
const MessagePage = lazy(() => import('../pages/Blog-Pages/MessagePage'));
const MorePage = lazy(() => import('../pages/Blog-Pages/MorePage'));
const PostDetail = lazy(() => import('../pages/Blog-Pages/DetailPost/PostDetail'));
const PostDetailPreview = lazy(() => import('../pages/Blog-Pages/DetailPost/PostDetailPreview'));

const pageMap: Record<string, JSX.Element> = {
    "/": <FeedPage />,
    "/profile": <ProfilePage />,
    "/explore": <ExplorePage />,
    "/notification": <NotificationPage />,
    "/message": <MessagePage />,
    "/more": <MorePage />,
    "/feed": <FeedPage />,
    "/post/:postId": <PostDetail />,
    "/post-pre/:postId": <PostDetailPreview />
}

let routes = {
    // 🔐 Các route được bảo vệ (chỉ dành cho người đã đăng nhập)
    protected: [
        {
            path: '/',
            element: (
                <ProtectedRouter>
                    <HomeLayout />
                </ProtectedRouter>
            ),
            children: [
                ...MENU_ITEMS
                    .filter(item => pageMap[item.to])
                    .map((item) => ({
                        path: item.to === "/" ? "" : item.to.replace("/", ""),
                        element: pageMap[item.to]
                    })),
                {
                    path: "/post/:postId",
                    element: <PostDetail />
                }
            ]
        },
        // route đổi mật khẩu (không nằm trong layout chính)
        {
            path: "/change-password",
            element: (
                <OtpProtectedRoute>
                    <ChangePasswordPage />
                </OtpProtectedRoute>
            ),
        },
    ],

    // 🧭 Các route public (ai cũng vào được) (Không thay đổi)
    public: [
        { path: "/welcome", element: <WelcomePage /> },
        { path: "/server-down", element: <ServerDownPage />},
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/forgot-password", element: <ForgetPasswordPage /> }
    ],

    // 🔁 Redirect logic (Không thay đổi)
    redirect: [
        // Route không tồn tại (wildcard)
        {
            path: "*",
            element: localStorage.getItem(STORAGE_KEY_AUTH_BLOG) // Hoặc logic check login của bạn
                ? <Navigate to="/" />
                : <Navigate to="/login" />,
        },
    ],
};

export default routes;

