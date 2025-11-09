import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const LeftModal = ({ user, rect, onClose , onLogout}) => {
  const modalRef = useRef(null);

  const modalStyle = {
    position: "fixed",
    width: `${rect.width}px`, // Rộng bằng phần tử trigger
    left: `${rect.left}px`, // Căn trái bằng phần tử trigger
    bottom: `${window.innerHeight - rect.top + 8}px`,
    zIndex: 50, // Đảm bảo nó nổi lên trên
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const username = user.username || user.userName || user.email;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Nội dung Modal */}
      <div
        ref={modalRef}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#181818] text-white rounded-2xl shadow-lg"
      >
        <div
          className="absolute bg-[#181818] w-4 h-4 rotate-45"
          style={{
            bottom: "-8px", // Nửa chiều cao
            left: "50%",
            marginLeft: "-8px", 
          }}
        />

        {/* Các lựa chọn trong Modal */}
        <div className="flex flex-col p-2">
          <button
            onClick={onLogout} 
            className="w-full text-left px-3 py-3 text-base font-semibold hover:bg-gray-700 rounded-lg"
          >
            Log out @{username}
          </button>
        </div>
      </div>
    </>
    ,
    document.body // Đây là mấu chốt: render ra ngoài body
  );
};

export default LeftModal;