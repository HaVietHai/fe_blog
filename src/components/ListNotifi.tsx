import type React from "react";
import type { Notification } from "../types/notification.type";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface IProps {
  items: Notification[];
  isLoading: boolean;
}

const ListNotifi: React.FC<IProps> = ({ items, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center py-5 text-lg text-gray-400">Đang tải thông báo...</div>;

  if (!items || items.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-center py-10 text-gray-400"
      >
        Bạn chưa có bất kỳ thông báo nào!
      </motion.div>
    );

  return (
    <motion.div
      layout
      className="flex flex-col space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {items.map((notification, index) => (
        <motion.div
          key={notification._id}
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.25 }}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.2)" }}
          className="px-4 py-3 rounded-xl bg-[var(--color-brand-dark)] cursor-pointer flex flex-row items-center space-x-3"
          onClick={() => navigate(`/infor/${notification.sender._id}`)}
        >
          <img
            src={notification.sender.avatar}
            className="w-12 h-12 rounded-full border border-cyan-300"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">
              {notification.sender.username}
            </span>
            <span className="text-sm text-gray-300">{notification.message}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ListNotifi;
