// src/hooks/useLikeToggle.ts
import { useState, useEffect } from 'react';
import type { IPost, ILikePost } from '../types/post.type';
import type { IComment } from '../types/comment.type';
import errorHandler from '../utils/errorHandle';
import { handleLikeOrUnlike } from '../services/post.service';

// Import các API service của bạn


// Hook này sẽ nhận 'items' (prop) và 'authUserId' (state)
export const useLikeToggle = (items: (IPost | IComment)[], authUserId: string | null) => {

    // 1. Mang tất cả state liên quan vào đây
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [internalItems, setInternalItems] = useState(items);
    const [isLiking, setIsLiking] = useState<Record<string, boolean>>({});

    // 2. Mang useEffect đồng bộ 'items' vào đây
    // Chỉ đồng bộ khi 'items' (prop) thay đổi THỰC SỰ
    useEffect(() => {
        // Chỉ cập nhật nếu không có thao tác like nào đang diễn ra CHO BẤT KỲ ITEM NÀO
        // (Kiểm tra xem object isLiking có đang trống không)
        if (Object.keys(isLiking).length > 0) {
            console.warn("Đã chặn đồng bộ state từ props do có thao tác like đang diễn ra.")
            return;
        }
        setInternalItems(items); // Đồng bộ

        if (!items || items.length === 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
        // BỎ isLiking khỏi dependency array
    }, [items]);

    // 3. Mang hàm logic chính 'handleToggleLike' vào đây
    const handleToggleLike = async (likedItem: IPost | IComment) => {
        const itemId = likedItem._id;

        // Kiểm tra null/undefined và trạng thái isLiking CỦA ITEM NÀY
        if (!authUserId || !itemId || isLiking[itemId]) {
            console.log(`Dừng lại: authUserId NULL, itemId NULL (${itemId}), hoặc ĐANG LIKE item ${itemId}.`);
            return;
        }

        // Đánh dấu item NÀY là đang liking
        setIsLiking(prev => ({ ...prev, [itemId]: true }));

        // Lưu trạng thái gốc để rollback
        const originalInternalItems = [...internalItems];

        const itemIndex = internalItems.findIndex(i => i._id === itemId);
        if (itemIndex === -1) {
            // Nếu item không tìm thấy (lạ?), thì mở khóa và thoát
            setIsLiking(prev => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
            return;
        }

        // Luôn đọc trạng thái mới nhất từ internalItems
        const currentItemFromState = internalItems[itemIndex];
        const currentLikedArray = Array.isArray(currentItemFromState.liked) ? currentItemFromState.liked : [];
        // Tính toán isLiked NGAY TẠI ĐÂY dựa trên state MỚI NHẤT
        const isCurrentlyLiked = currentLikedArray.includes(authUserId);

        // --- Optimistic UI Update ---
        const newInternalItems = [...internalItems];
        const updatedItem = { ...currentItemFromState };

        if (isCurrentlyLiked) { // Nếu đang like -> unlike
            updatedItem.liked = currentLikedArray.filter(id => id !== authUserId);
        } else { // Nếu chưa like -> like
            updatedItem.liked = [...currentLikedArray, authUserId];
        }
        newInternalItems[itemIndex] = updatedItem;
        setInternalItems(newInternalItems); // Cập nhật UI ngay lập tức

        // --- API Call ---
        try {
            const data: ILikePost = {
                authorId: authUserId,
                postId: itemId
            };
            const isPost = 'title' in likedItem; // Check type

            // Gọi API dựa trên trạng thái isCurrentlyLiked đã tính toán ở trên
            if (isPost) {
                if (!isCurrentlyLiked) await handleLikeOrUnlike(data, 1); // API Like Post
                else await handleLikeOrUnlike(data, 2);                  // API Unlike Post
            } else { // Là Comment
                if (!isCurrentlyLiked) await handleLikeOrUnlike(data, 3); // API Like Comment
                else await handleLikeOrUnlike(data, 4);                  // API Unlike Comment
            }

        } catch (error: any) {
            console.log("Lỗi khi call API:", error.message);
            errorHandler(error);
            // Rollback về trạng thái TRƯỚC KHI bấm nút
            setInternalItems(originalInternalItems);
        } finally {
            // Mở khóa item NÀY sau khi API hoàn tất (dù thành công hay lỗi)
            setIsLiking(prev => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
        }
    };

    // 4. Trả về các giá trị mà component UI cần
    return { isLoading, internalItems, handleToggleLike };
};