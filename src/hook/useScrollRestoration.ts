import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = (key: string) => {
  const location = useLocation();

  useEffect(() => {
    const savedScrollY = sessionStorage.getItem(`scroll-pos-${key}`);
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY, 10));
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-pos-${key}`, window.scrollY.toString());
    };
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-pos-${key}`, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.key, key]);
};
