import { getErrorMessage } from "../constants/errors.constant";
import { showNotification } from "./helper";

const showErrorNotification = (message: string) => {
    showNotification({
        type: 'error',
        message: message,
    });
};

const errorHandler = (error: any) => {
    // Mất kết nối mạng
    if (!navigator.onLine) {
        showErrorNotification('Không có kết nối internet');
        return;
    }

    const response = error?.response;
    console.log("response:", response.data.message);
    console.log("status:", response.status);
    

    // Nếu không có phản hồi từ server (VD: server sập)
    if (!response) {
        const msg = error?.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
        showErrorNotification(getErrorMessage(msg));
        return;
    }

    // Bắt lỗi cụ thể theo status code
    if (response.status === 400) {
        console.log("Da nhay vao loi 400");
        
        const apiMessage =
            response.data?.message ||
            response.data?.error?.message ||
            'Yêu cầu không hợp lệ.';
        console.log("Loi la:", apiMessage);
            
        showErrorNotification(apiMessage);
        return;
    }

    if (response.status === 401) {
        showErrorNotification('Phiên đăng nhập hết hạn hoặc không hợp lệ.');
        return;
    }

    if (response.status === 403) {
        showErrorNotification('Bạn không có quyền truy cập tài nguyên này.');
        return;
    }

    // Lỗi mặc định
    const message =
        response.data?.message ||
        response.data?.error?.message ||
        'Đã xảy ra lỗi không xác định.';
    showErrorNotification(getErrorMessage(message));
};

export default errorHandler;
