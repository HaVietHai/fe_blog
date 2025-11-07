import { Outlet } from "react-router-dom";
import { useRef } from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

export default function HomeLayout() {
  const feedRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-black text-[var(--color-text-main)]">
      <div className="w-70 flex-shrink-0 h-full overflow-y-auto no-scrollbar">
        <SidebarLeft />
      </div>

      <main
        ref={feedRef}
        className="flex-1 h-full border-x border-[var(--color-border-soft)] bg-black overflow-hidden"
      >
        {/* Đây là vùng scroll */}
        <div
          id="feed-scroll-container"
          className="p-6 h-full overflow-y-auto no-scrollbar"
        >
          <Outlet />
        </div>
      </main>

      <div className="no-scrollbar w-96 flex-shrink-0 h-full overflow-y-auto hidden lg:block">
        <SidebarRight />
      </div>
    </div>
  );
}
