import { Link, useLocation } from "react-router-dom"
import { MENU_ITEMS } from "../../../constants/menuItem.constant";
import { IconLucide } from "../../../components/IconLucide";
import logoImage from "../../../assets/logo-banner/V.png"
import { StorageService } from "../../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../../constants/key.constant";

const SidebarLeft = () => {

    const location = useLocation();
    const user = StorageService.getItem(STORAGE_KEY_AUTH_BLOG)         

    return (
        <aside className="w-70 sticky border-r border-[var(--color-border-soft)] p-2 bg-black">
            <Link to={'/'}>
                <img src={logoImage} style={{ width: "120px", height: "120px", marginLeft: "50px" }} />
            </Link>
            <nav className="mt-6 flex flex-col gap-3 text-[var(--color-text-secondary)]">
                {MENU_ITEMS.map(({ title, to, icon }) => {
                    const isActive = location.pathname === to;
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center text-xl gap-3 px-2 py-2 rounded-lg transition-all
                            ${isActive ? "text-cyan-400 font-bold bg-[var(--color-brand-dark)]"
                                    : "hover:text-cyan-400 hover:rounded-lg hover:bg-[var(--color-brand-dark)]"
                                }`}
                        >
                            <IconLucide name={icon} className="w-5 h-5" />
                            <span>{title}</span>
                        </Link>
                    )
                })}
                <button
                    className="px-2 py-2 mt-4 border rounded-full hover:cursor-pointer hover:brightness-125"
                    style={{ background: "var(--gradient-brand)" }}
                >
                    <span className="font-semibold text-lg text-white">Post</span>
                </button>
            </nav>
            <div
                className={`flex flex-row w-full h-auto mt-19 p-2 rounded-full items-center justify-between
                    hover:bg-[var(--color-border-soft)] cursor-pointer`}
            >
                <img src={user.user.avatar} style={{ width: "50px", height: "50px", borderRadius: "30px", alignItems: 'center' }} />
                <div className="flex flex-col ml-3 flex-1">
                    <span className="text-lg font-serif mb-2 text-white">{user.user.userName || user.user.username}</span>
                    <span className="text-sm text-gray-500 break-words">{user.user.email}</span>
                </div>
                <IconLucide name="MoreHorizontal" className="text-white" />
            </div>
        </aside>
    )
}

export default SidebarLeft