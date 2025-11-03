import Header from "../../components/Forms/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import errorHandler from "../../utils/errorHandle";
import type { IUser } from "../../types/user.type";
import { handleGetInforFriend } from "../../services/user.service";
import AnimationLoader from "../../components/AnimationLoader";
import { handleGetPostOwner } from "../../services/post.service";
import type { IPost } from "../../types/post.type";
import List from "../../components/List";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import ProfilePage from "./ProfilePage";
import { useFollowToggle } from "../../hook/useFollowToggle";

const InforFriendPage = () => {
  const { id } = useParams();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [infor, setInfor] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isMe, setIsMe] = useState<boolean>(false);

  // 🔐 Lấy user từ localStorage
  const authData = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const currentUser = authData?.user;  
  const idIsMe = currentUser?._id || currentUser.id;

  const getInfo = async (id: string) => {
    try {
      setIsLoadingData(true);
      const response = await handleGetInforFriend(id);
      setInfor(response);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const getPost = async (id: string, page: number) => {
    try {
      setIsLoadingData(true);
      const response = await handleGetPostOwner(id, page);
      setPosts(response.posts);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // ✅ Kiểm tra là chính mình hay không
  useEffect(() => {
    if (!id || !idIsMe) return;
    setIsMe(id === idIsMe);
    getInfo(id);
  }, [id, idIsMe]);

  // ✅ Lấy post của user
  useEffect(() => {
    if (!id) return;
    getPost(id, page);
  }, [id, page]);

  // ✅ Follow / Unfollow
  const { handleToggleFollow, isFollowing, isLoading } = useFollowToggle(
    infor,
    idIsMe,
    setInfor
  );

  if (!idIsMe)
    return (
      <div className="text-center text-white p-6">
        Vui lòng đăng nhập để xem thông tin bạn bè.
      </div>
    );

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

          {/* Banner */}
          <div className="w-full h-90 bg-black flex flex-col">
            <div className="absolute overflow-hidden w-full h-85 bg-gray-900">
              <img
                src={infor?.banner || infor?.avatar}
                className="object-cover w-full h-fit"
              />
            </div>
            <div className="flex flex-row relative w-45 h-45 overflow-hidden rounded-full top-65 left-3 border-4 border-black">
              <img
                src={infor?.avatar}
                className="w-45 h-45 object-cover bg-black"
              />
            </div>
          </div>

          {/* Info */}
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
                onClick={handleToggleFollow}
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
              <h1 className="font-bold text-lg text-gray-200 mt-2">My posts</h1>
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
    </div>
  );
};

export default InforFriendPage;
