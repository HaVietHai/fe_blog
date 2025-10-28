import type React from "react";
import type { ILikePost, IPost } from "../types/post.type";
import ImageGrid from "./ImageGrip"
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import type { IComment } from "../types/comment.type";
import Footer from "./Forms/Footer";
import AnimationLoader from "./AnimationLoader";
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant";
import { StorageService } from "../services/storage.service";
import { useLikeToggle } from "../hook/useLikeToggle";

interface IProp {
    items: (IPost | IComment)[]
    className?: React.HTMLAttributes<HTMLDivElement> | string | undefined,
}

const List: React.FC<IProp> = ({
    items, className
}) => {

    // 1. Chỉ giữ lại state 'authUserId'
    const [authUserId, setAuthUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    // 2. Giữ lại useEffect lấy authUserId
    useEffect(() => {
        const authData = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
        if (authData && authData.user && (authData.user.id || authData.user._id)) {
            setAuthUserId(authData.user._id || authData.user.id)
        }
        // console.log(authUserId);
    }, [])

    // 3. GỌI CUSTOM HOOK
    // Toàn bộ logic (isLoading, internalItems, handleToggleLike)
    // được quản lý bởi hook này.    
    const { isLoading, internalItems, handleToggleLike } = useLikeToggle(items, authUserId);

    return (
        <div className={className}>
            {!isLoading ? (
                <div>
                    {internalItems.map((item) => {
                        // FIX: Đọc `isLiked` và `likeCount` từ state nội bộ,
                        // không phải tính toán lại ở đây
                        const currentLikedArray = Array.isArray(item.liked) ? item.liked : [];
                        const isLiked = authUserId ? currentLikedArray.includes(authUserId) : false;
                        const likeCount = currentLikedArray.length;

                        return (
                            <div
                                key={item._id}
                                className="mt-3 hover:cursor-pointer bg-[var(--color-brand-dark)] p-4 rounded-[var(--radius-card)] border border-[var(--color-border-soft)]"
                            >
                                <div
                                    onClick={() => navigate(`/post/${item._id}`)}
                                    className="flex flex-row"
                                >
                                    <img alt="UserAvatar" src={item.authorId?.avatar} className="w-12 h-12 rounded-full" />
                                    <div className="flex flex-col ml-3 flex-1 space-y-3">
                                        <div className="flex flex-row">
                                            <p className="text-[var(--color-text-main)] text-sm font-bold">{item.authorId?.username}</p>
                                            <span className="text-sm ml-1 text-[var(--color-text-secondary)]">
                                                · {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p
                                            className="text-[var(--color-text-main)] mt-1 break-words"
                                        >
                                            {"title" in item ? item.title : item.content}
                                        </p>
                                        {item.images && (
                                            <ImageGrid images={item.images} />
                                        )}
                                    </div>
                                </div>
                                <Footer
                                    isLiked={isLiked}
                                    viewFooter={1}
                                    countComment={"commentCount" in item ? item.commentCount : 0}
                                    countLiked={likeCount}
                                    onLiked={() => handleToggleLike(item)}
                                />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <AnimationLoader show={!isLoading} message="Vui lòng chờ giây lát. Đang tải..." />
            )}
        </div>
    )
}

export default List