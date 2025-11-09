import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import { getAllNotifi } from "../../services/notification.service";
import errorHandler from "../../utils/errorHandle";
import Header from "../../components/Forms/Header";
import { IconLucide } from "../../components/IconLucide";
import ListNotifi from "../../components/ListNotifi";
import ConfirmModal from "../../components/CofirmModal";

const NotificationPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterType, setFilterType] = useState<"all" | "follow" | "like" | "comment">("all");

  const user = StorageService.getItem(STORAGE_KEY_AUTH_BLOG).user;
  const userId = user._id || user.id;

  const handleGetNotifications = async (userId: string) => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const response = await getAllNotifi(userId);
      setNotifications(response);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetNotifications(userId);
  }, [userId]);

  const filteredNotifications = notifications.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Header title="Notifications" isDetail />

      <motion.div className="mt-10" layout>
        {/* Tabs Filter */}
        <motion.div className="flex flex-row mb-5 items-center justify-between">
          <div className="flex flex-row flex-1 space-x-6">
            {["all", "follow", "like", "comment"].map((type) => (
              <motion.span
                key={type}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative text-lg font-medium cursor-pointer ${
                  filterType === type
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-400 hover:text-cyan-300"
                }`}
                onClick={() => setFilterType(type as any)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}

                {filterType === type && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.span>
            ))}
          </div>

          <motion.button
            onClick={() => setShowConfirm(true)}
            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
            title="Clear All"
            className="p-2 rounded-full hover:bg-gray-800"
          >
            <IconLucide name="BrushCleaning" className="w-5 h-5 text-gray-300" />
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filterType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ListNotifi items={filteredNotifications} isLoading={isLoading} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {showConfirm && (
        <ConfirmModal
          onConfirm={() => console.log("Xóa toàn bộ thông báo")}
          show={showConfirm}
          onCancel={() => setShowConfirm(false)}
          message="Bạn có chắc muốn làm trống toàn bộ thông báo không?"
        />
      )}
    </motion.div>
  );
};

export default NotificationPage;
