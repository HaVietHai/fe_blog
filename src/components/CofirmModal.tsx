import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const ConfirmModal = ({ show, onConfirm, onCancel, message }: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#1e1e1e] rounded-2xl p-6 w-[90%] max-w-[400px] text-white shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-lg font-bold mb-3">Xác nhận hành động</h2>
            <p className="text-gray-300 mb-6">{message || "Bạn có chắc muốn thực hiện hành động này?"}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 hover:cursor-pointer rounded-full bg-gray-600 hover:bg-gray-500 transition"
              >
                <span className="font-semibold">Hủy</span>
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-full bg-white hover:cursor-pointer hover:bg-gray-300 transition"
              >
                <span className="text-black font-semibold">Xác nhận</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
