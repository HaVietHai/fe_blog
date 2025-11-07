// src/hook/useScrollToTopExceptFeed.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTopExceptFeed = () => {
  const location = useLocation();

  useEffect(() => {
    // Nếu không phải feed thì scrollTo top
    if (location.pathname !== "/" && !location.pathname.startsWith("/feed")) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname]);
};
