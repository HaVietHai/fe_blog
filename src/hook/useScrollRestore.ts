import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestore = () => {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  const isFeed =
    location.pathname === "/" ||
    location.pathname === "/feed" ||
    location.pathname === "";

  useEffect(() => {
    // Khi ở trong FEED → khôi phục vị trí cũ
    if (isFeed) {
      const savedScroll = sessionStorage.getItem("feedScrollY");
      if (savedScroll) {
        requestAnimationFrame(() =>
          window.scrollTo({ top: parseFloat(savedScroll), behavior: "instant" })
        );
      }

      // Theo dõi scroll để lưu lại liên tục
      const handleScroll = () =>
        sessionStorage.setItem("feedScrollY", String(window.scrollY));
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      // 🔹 Khi vào TRANG KHÁC (không phải feed) → luôn scroll về top
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "instant" })
      );
    }

    prevPath.current = location.pathname;
  }, [location.pathname, isFeed]);
};
