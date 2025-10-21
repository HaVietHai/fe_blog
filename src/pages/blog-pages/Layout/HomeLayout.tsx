import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-black text-[var(--color-text-main)]">
      
      {/* Sidebar trái */}
      <div className="w-70 flex-shrink-0 h-full overflow-y-auto no-scrollbar">
        <SidebarLeft />
      </div>

      {/* Feed trung tâm */}
      <main className="flex-1 h-full overflow-y-auto border-x border-[var(--color-border-soft)] bg-black no-scrollbar">
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Sidebar phải */}
      <div className="no-scrollbar w-96  flex-shrink-0 h-full overflow-y-auto hidden lg:block">
        <SidebarRight />
      </div>

    </div>
  );
}

