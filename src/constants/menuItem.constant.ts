import type { MenuItem } from "../types/other.type";

export const MENU_ITEMS: MenuItem[] = [
    {
        title: "Home",
        to: "/",
        icon: "Home"
    },
    {
        title: "Explore",
        to: "/explore",
        icon: "Search"
    },
    {
        title: "Message",
        to: "/message",
        icon: "Mail"
    },
    {
        title: "Notification",
        to: "/notification",
        icon: "Bell"
    },
    {
        title: "Profile",
        to: "/profile",
        icon: "User"
    },
    {
        title: "More",
        to: "/more",
        icon: "CircleEllipsis"
    }
]