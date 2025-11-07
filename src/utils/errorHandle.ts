import { getErrorMessage } from "../constants/errors.constant";
import { showNotification } from "./helper";

const showErrorNotification = (message: string) => {
    showNotification({
        type: 'error',
        message: message,
    });
};

const normalizeMessage = (data: any): string => {
    // Chuẩn hóa các kiểu dữ liệu backend có thể trả về
    if (!data) return 'Đã xảy ra lỗi không xác định.';
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) return data.join(', ');
    if (typeof data === 'object') {
        return (
            data.message ||
            data.error?.message ||
            data.error ||
            JSON.stringify(data)
        );
    }
    return String(data);
};

const errorHandler = (error: any) => {
    // Mất kết nối mạng
    if (!navigator.onLine) {
        showErrorNotification('Không có kết nối internet');
        return;
    }

    const response = error?.response;
    console.log("response:", response?.data?.message);
    console.log("status:", response?.status);

    // Nếu không có phản hồi từ server (VD: server sập)
    if (!response) {
        const msg = error?.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
        showErrorNotification(getErrorMessage(msg));
        return;
    }

    // Chuẩn hóa dữ liệu phản hồi để an toàn
    const safeData = response?.data || {};

    // Bắt lỗi cụ thể theo status code
    if (response.status === 400) {        
        const apiMessage = normalizeMessage(safeData);
        console.log("Lỗi là:", apiMessage);
        showErrorNotification(apiMessage || 'Yêu cầu không hợp lệ.');
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
    const message = normalizeMessage(safeData);
    showErrorNotification(getErrorMessage(message));
};

export default errorHandler;
