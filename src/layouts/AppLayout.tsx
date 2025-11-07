import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const isFeed =
    location.pathname === "/" ||
    location.pathname === "/feed" ||
    location.pathname === "";

  // Tạo key riêng biệt giữa feed và các trang khác
  // Điều này giúp React render lại khi rời feed
  const layoutKey = isFeed ? "feed-layout" : `page-${location.pathname}`;

  return <Outlet key={layoutKey} />;
};

export default AppLayout;
