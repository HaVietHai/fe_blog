import { Link, useLocation, useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../../../constants/menuItem.constant";
import { IconLucide } from "../../../components/IconLucide";
import logoImage from "../../../assets/logo-banner/V.png";
import { StorageService } from "../../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../../constants/key.constant";
import { useState, useRef } from "react";
import ModalPost from "../Post/View/Modal";
import LeftModal from "../../../components/LeftModal";
import { useDispatch } from "react-redux";
import { setOtpVerified } from "../../../redux/slices/otp.slice";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLeft = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPost, setShowPost] = useState(false);
    const [showModalLeft, setShowModalLeft] = useState(false);
    const [modalRect, setModalRect] = useState<DOMRect | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();
    const user = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
    const id = user.user.id || user.user._id;

    const handleOnReload = () => {
        console.log("Nothing here!!");
    };

    const handleOpenModal = () => {
        if (triggerRef.current) {
            setModalRect(triggerRef.current.getBoundingClientRect());
            setShowModalLeft(true);
        }
    };

    const handleLogout = () => {
        StorageService.clearItem(STORAGE_KEY_AUTH_BLOG);
        dispatch(setOtpVerified(false));
        navigate("/login");
    };

    return (
        <motion.aside
            className="w-70 sticky border-r border-[var(--color-border-soft)] p-2 bg-black"
        >
            <Link to={"/"}>
                <motion.img
                    src={logoImage}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "120px", height: "120px", marginLeft: "50px" }}
                />
            </Link>

            <nav className="mt-6 flex flex-col gap-3 text-[var(--color-text-secondary)]">
                {MENU_ITEMS.map(({ title, to, icon }) => {
                    const isActive = location.pathname === to;
                    return (
                        <motion.div
                            whileHover={{ scale: 1.05, x: 4 }}
                            key={to}
                        >
                            <Link
                                to={to}
                                className={`flex items-center text-xl gap-3 px-2 py-2 rounded-lg transition-all
                            ${isActive
                                        ? "text-cyan-400 font-bold bg-[var(--color-brand-dark)]"
                                        : "hover:text-cyan-400 hover:rounded-lg hover:bg-[var(--color-brand-dark)]"
                                    }`}
                            >
                                <IconLucide
                                    name={icon}
                                    className={`w-5 h-5 ${isActive ? "fill-cyan-500" : ""}`}
                                />
                                <span>{title}</span>
                            </Link>
                        </motion.div>
                    );
                })}

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPost(true)}
                    className="px-2 py-2 mt-4 border rounded-full hover:cursor-pointer hover:brightness-125"
                    style={{ background: "var(--gradient-brand)" }}
                >
                    <span className="font-semibold text-lg text-white">Post</span>
                </motion.button>
            </nav>

            {/* Avatar Section */}
            <motion.div
                ref={triggerRef}
                onClick={handleOpenModal}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`flex flex-row w-full h-auto mt-19 p-2 rounded-full items-center justify-between cursor-pointer`}
            >
                <motion.img
                    src={user.user.avatar}
                    alt="avatar"
                    className="rounded-full"
                    style={{ width: "50px", height: "50px" }}
                    whileHover={{ rotate: 2 }}
                />
                <div className="flex flex-col ml-3 flex-1">
                    <span className="text-lg font-serif mb-2 text-white">
                        {user.user.userName || user.user.username}
                    </span>
                    <span className="text-sm text-gray-500 break-words">
                        {user.user.email}
                    </span>
                </div>
                <IconLucide name="MoreHorizontal" className="text-white" />
            </motion.div>

            {/* Post Modal */}
            <AnimatePresence>
                {showPost && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ModalPost
                            authorId={id}
                            onReload={handleOnReload}
                            onClose={() => setShowPost(false)}
                            name="title"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Modal */}
            <AnimatePresence>
                {showModalLeft && modalRect && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <LeftModal
                            user={user.user}
                            rect={modalRect}
                            onClose={() => setShowModalLeft(false)}
                            onLogout={handleLogout}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.aside>
    );
};

export default SidebarLeft;
