import React from "react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay tối */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40" />

      {/* Modal trung tâm */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 text-center p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bạn cần đăng nhập để tiếp tục
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-6">
          Vui lòng đăng nhập hoặc tạo tài khoản để tương tác với bài viết này.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          >
            Đăng ký
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </>
  );
};

export default AuthModal;
