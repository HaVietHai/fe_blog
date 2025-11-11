import type React from "react";
import type { IPost } from "../types/post.type";
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
import { IconLucide } from "./IconLucide";
import PostMoreMenu from "./PostMoreMenu";
import errorHandler from "../utils/errorHandle";
import { removePostAct } from "../services/post.service";
import ModalView from "../pages/Blog-Pages/Post/View/Modal";
import { showNotification } from "../utils/helper";
import ConfirmModal from "./CofirmModal";

interface IProp {
    items: (IPost | IComment)[]
    className?: React.HTMLAttributes<HTMLDivElement> | string | undefined,
    isMe?: boolean;
    onReload?: () => void,
    isComment?: boolean,
    avatar?: string
}

const List: React.FC<IProp> = ({
    items, className, isMe, onReload, isComment, avatar
}) => {

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showedit, setShowEdit] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [idSelected, setIdSelected] = useState<string | undefined>("");

    // 1. Chỉ giữ lại state 'authUserId'
    const [authUserId, setAuthUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    // 2. Giữ lại useEffect lấy authUserId
    useEffect(() => {
        const authData = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
        if (authData && authData.user && (authData.user.id || authData.user._id)) {
            setAuthUserId(authData.user._id || authData.user.id)
        }
    }, [items])

    // 3. GỌI CUSTOM HOOK
    // Toàn bộ logic (isLoading, internalItems, handleToggleLike)
    // được quản lý bởi hook này.    
    const { isLoading, internalItems, handleToggleLike } = useLikeToggle(items, authUserId);

    const handleEdit = () => {
        setShowMenu(false)
        setShowEdit(true);
    }

    const handleRemovePost = async () => {
        setShowMenu(false);
        setShowConfirm(true);
    }

    const onRemovePost = async (postId: string, authorId: string) => {
        if (!authorId) return;
        
        try {
            await removePostAct(postId, authorId);
            if (onReload) onReload();
            showNotification({ type: 'success', message: "Bài viết đã được gỡ xuống", duration: 3000 })
            setShowConfirm(false);
        } catch (error) {
            errorHandler(error);
        }
    }

    const changePageDetail = (id: string) => {
        navigate(`/post/${id}`)
    }

    return (
        <div className={className}>
            {!isLoading ? (
                <div>
                    {internalItems.map((item) => {
                        const currentLikedArray = Array.isArray(item.liked) ? item.liked : [];
                        const isLiked = authUserId ? currentLikedArray.includes(authUserId) : false;
                        const likeCount = currentLikedArray.length;
                        const id = item._id;

                        return (
                            <div
                                key={item._id}
                                className="relative mt-3 bg-[var(--color-brand-dark)] p-4 rounded-[var(--radius-card)] border border-[var(--color-border-soft)]"
                            >
                                <div className="flex flex-row">
                                    <img
                                        onClick={() => navigate(`/infor/${item.authorId?._id}`)}
                                        alt="UserAvatar"
                                        src={item.authorId?.avatar || item.avatar || avatar}
                                        className="w-12 h-12 rounded-full hover:cursor-pointer"
                                    />

                                    <div className="flex flex-col ml-3 flex-1 space-y-3">
                                        {/* Header */}
                                        {isMe ? (
                                            <div className="flex flex-row items-center">
                                                <p className="text-[var(--color-text-main)] text-sm font-bold">
                                                    {item.authorId?.username}
                                                </p>
                                                <span className="text-sm flex-1 ml-1 text-[var(--color-text-secondary)]">
                                                    ·{" "}
                                                    {formatDistanceToNow(new Date(item.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </span>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => {
                                                            if (idSelected === item._id) {
                                                                setShowMenu(false);
                                                                setIdSelected(undefined);
                                                            } else {
                                                                setIdSelected(item._id);
                                                                setShowMenu(true);
                                                            }
                                                        }}
                                                        type="button"
                                                        className="w-8 h-8 hover:bg-gray-600 rounded-full hover:cursor-pointer"
                                                    >
                                                        <IconLucide name="MoreHorizontalIcon" className="ml-1" />
                                                    </button>

                                                    {/* Menu sẽ dính sát icon More */}
                                                    {showMenu && idSelected === item._id && (
                                                        <div className="absolute left-15 bottom-150 z-50">
                                                            <PostMoreMenu
                                                                onClose={() => setShowMenu(false)}
                                                                onDelete={() => handleRemovePost()}
                                                                onEdit={handleEdit}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        ) : (
                                            <div className="flex flex-row items-center">
                                                <p className="text-[var(--color-text-main)] text-sm font-bold">
                                                    {item.authorId?.username}
                                                </p>
                                                <span className="text-sm flex-1 ml-1 text-[var(--color-text-secondary)]">
                                                    ·{" "}
                                                    {formatDistanceToNow(new Date(item.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {/* Nội dung post */}
                                        <div
                                            className="hover:cursor-pointer"
                                        >
                                            <p
                                                onClick={() => navigate(`/post/${item._id}`)}
                                                className="text-[var(--color-text-main)] mt-1 break-words"
                                            >
                                                {"title" in item ? item.title : item.content}
                                            </p>
                                            {item.images && <ImageGrid images={item.images} />}
                                        </div>
                                    </div>
                                </div>
                                {/* Footer */}
                                <Footer
                                    isComment={isComment}
                                    onChat={() => changePageDetail(id)}
                                    isLiked={isLiked}
                                    viewFooter={1}
                                    countComment={"commentCount" in item ? item.commentCount : 0}
                                    countLiked={likeCount}
                                    onLiked={() => handleToggleLike(item)}
                                />
                            </div>
                        );
                    })}
                    {showedit && (
                        <ModalView
                            authorId={authUserId}
                            onClose={() => setShowEdit(false)}
                            postId={idSelected ? idSelected : ""}
                            isEdit
                            name="title"
                            onReload={onReload}
                        />
                    )}
                    {showConfirm && (
                        <ConfirmModal
                            onCancel={() => setShowConfirm(false)}
                            onConfirm={() => onRemovePost(idSelected,authUserId)}
                            show={showConfirm}
                        />
                    )}
                </div>
            ) : (
                <AnimationLoader show={!isLoading} message="Vui lòng chờ giây lát. Đang tải..." />
            )}
        </div>
    )
}

export default List