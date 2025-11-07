import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Forms/Header";
import AnimationLoader from "../../components/AnimationLoader";
import List from "../../components/List";
import ConfirmModal from "../../components/CofirmModal";
import ProfilePage from "./ProfilePage";

import { handleGetInforFriend } from "../../services/user.service";
import { handleGetPostOwner } from "../../services/post.service";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import { useFollowToggle } from "../../hook/useFollowToggle";
import errorHandler from "../../utils/errorHandle";

import type { IUser } from "../../types/user.type";
import type { IPost } from "../../types/post.type";

const InforFriendPage = () => {
  const { id: targetUserId } = useParams<{ id: string }>();

  const [infor, setInfor] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Lấy thông tin user hiện tại
  const authData = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const currentUser = authData?.user;
  const currentUserId = currentUser?._id || currentUser?.id;

  // Hook xử lý follow
  const { isFollowing, isLoading, followUser, unfollowUser, checkFollowStatus } =
    useFollowToggle(infor, currentUserId, setInfor);

  // Fetch thông tin bạn bè
  const getInfo = useCallback(async (userId: string) => {
    try {
      setIsLoadingData(true);
      const data = await handleGetInforFriend(userId);
      setInfor(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Fetch bài viết của user
  const getPost = useCallback(async (userId: string, pageNum: number) => {
    try {
      setIsLoadingData(true);
      const res = await handleGetPostOwner(userId, pageNum);
      setPosts(res.posts);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Kiểm tra là chính mình hay không
  useEffect(() => {
    if (!targetUserId || !currentUserId) return;
    setIsMe(targetUserId === currentUserId);
    getInfo(targetUserId);
  }, [targetUserId, currentUserId, getInfo]);

  // Cập nhật trạng thái follow
  useEffect(() => {
    if (infor && currentUserId) checkFollowStatus();
  }, [infor, currentUserId, checkFollowStatus]);

  // Lấy post của user
  useEffect(() => {
    if (targetUserId) getPost(targetUserId, page);
  }, [targetUserId, page, getPost]);

  // Click follow / unfollow
  const handleFollowClick = () => {
    if (isFollowing) {
      setShowConfirmModal(true);
    } else {
      followUser();
    }
  };

  // Xác nhận unfollow
  const confirmUnfollow = async () => {
    setShowConfirmModal(false);
    await unfollowUser();
  };

  // Nếu chưa đăng nhập
  if (!currentUserId) {
    return (
      <div className="text-center text-white p-6">
        Vui lòng đăng nhập để xem thông tin bạn bè.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white w-auto">
      {isMe ? (
        <ProfilePage />
      ) : (
        <>
          <Header
            isDetail={false}
            title={infor?.username || infor?.userName}
            numberPost={posts?.length || 0}
            isIcons={true}
          />

          {/* Banner + Avatar */}
          <div className="relative w-full h-90 bg-black flex flex-col">
            <div className="absolute inset-0 overflow-hidden bg-gray-900">
              <img
                src={infor?.banner || infor?.avatar}
                alt="banner"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative z-10 flex flex-row items-center">
              <div className="absolute top-65 left-3 w-45 h-45 rounded-full overflow-hidden border-4 border-black">
                <img
                  src={infor?.avatar}
                  alt="avatar"
                  className="object-cover w-full h-full bg-black"
                />
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="mt-20 px-4">
            <div className="flex flex-row justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {infor?.username || infor?.userName}
                </h1>
                <span className="text-gray-400 text-sm font-semibold">
                  {infor?.email}
                </span>
              </div>

              <button
                onClick={handleFollowClick}
                disabled={isLoading}
                type="button"
                className={`px-5 py-2 h-fit rounded-full transition-all duration-150 ${
                  isFollowing
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {isLoading
                  ? "..."
                  : isFollowing
                  ? "Followed"
                  : "Follow"}
              </button>
            </div>

            {/* Posts */}
            <div className="w-full h-auto border-t mt-4 border-[var(--color-border-soft)]">
              <h1 className="font-bold text-lg text-gray-200 mt-2">
                My posts
              </h1>
              {!isLoadingData ? (
                <div className="px-3 py-2">
                  <List items={posts} isMe={false} />
                </div>
              ) : (
                <AnimationLoader
                  show={!isLoadingData}
                  message="Đang lấy dữ liệu..."
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal xác nhận unfollow */}
      <ConfirmModal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={confirmUnfollow}
        message={`Bạn có chắc muốn hủy theo dõi " ${
          infor?.username || "người này"
        } " không?`}
      />
    </div>
  );
};

export default InforFriendPage;
