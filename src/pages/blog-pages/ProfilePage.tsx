import Header from "../../components/Forms/Header";
import avatar from "../../assets/avatar-test/209d0167-7fde-42b8-9831-4930414fe8b2.jpg";
import List from "../../components/List";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import errorHandler from "../../utils/errorHandle";
import { useEffect, useRef, useState, useCallback } from "react";
import type { IPost } from "../../types/post.type";
import { handleGetPostOwner } from "../../services/post.service";
import AnimationLoader from "../../components/AnimationLoader";

const SCROLL_KEY = "profileScrollY";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [numberPost, setNumberPost] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false); // Flag chống double-load

  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const user = token?.user || {};
  const id = user.id || user._id;

  // Lưu vị trí scroll
  const handleSaveScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(SCROLL_KEY, String(scrollRef.current.scrollTop));
    }
  };

  // Khôi phục vị trí scroll lần đầu
  const restoreScrollAfterRender = useCallback((tryCount = 0) => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (!saved || !scrollRef.current) return;
    const y = Number(saved) || 0;

    requestAnimationFrame(() => {
      const container = scrollRef.current!;
      const canScroll = container.scrollHeight > y + container.clientHeight;
      if (canScroll || tryCount > 5) {
        container.scrollTo(0, y);
      } else {
        setTimeout(() => restoreScrollAfterRender(tryCount + 1), 80);
      }
    });
  }, []);

  // Hàm load dữ liệu user post
  const handleGetOwnerPost = useCallback(
    async (page: number, append = false) => {
      if (loadingRef.current) return; // chống spam
      loadingRef.current = true;
      setIsLoading(true);

      try {
        const response = await handleGetPostOwner(id, page);

        setPosts((prev) =>
          append ? [...prev, ...(response.posts || [])] : response.posts || []
        );

        const totalPages = response.pagination?.totalPages || 1;
        const totalPosts = response.pagination?.totalPosts || 0;
        setNumberPost(totalPosts);
        setHasMore(page < totalPages);

        // Chỉ restore scroll khi load trang đầu tiên
        if (!append && page === 1) {
          await new Promise((r) => setTimeout(r, 150));
          restoreScrollAfterRender();
        }
      } catch (error: any) {
        errorHandler(error);
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    },
    [id, restoreScrollAfterRender]
  );

  // Reload thủ công
  const handleReloadPost = async () => {
    setPage(1);
    await handleGetOwnerPost(1);
  };

  // Lần đầu load
  useEffect(() => {
    const init = async () => {
      await handleGetOwnerPost(1);
      setInitialized(true);
    };
    init();
  }, [id, handleGetOwnerPost]);

  // Infinite Scroll
  useEffect(() => {
    if (!initialized || !scrollRef.current) return;
    const el = scrollRef.current;

    const onScroll = () => {
      handleSaveScroll();
      if (loadingRef.current || !hasMore) return;

      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
      if (nearBottom) {
        setPage((prev) => prev + 1);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [initialized, hasMore]);

  // Load thêm khi page thay đổi
  useEffect(() => {
    if (!initialized || page === 1) return;
    handleGetOwnerPost(page, true);
  }, [page, initialized, handleGetOwnerPost]);

  return (
    <div
      ref={scrollRef}
      className="relative h-full overflow-y-auto bg-black text-white no-scrollbar"
    >
      <Header
        isDetail={false}
        title={user.username || user.userName}
        numberPost={numberPost}
        isIcons={true}
      />

      <div className="w-full h-90 bg-black flex flex-col">
        <div className="absolute overflow-hidden w-full h-85 bg-gray-900">
          <img
            src={user.banner || avatar}
            className="object-cover w-full h-fit"
          />
        </div>
        <div className="flex flex-row relative w-45 h-45 overflow-hidden rounded-full top-65 left-3 border-4 border-black">
          <img
            src={user.avatar || avatar}
            className="w-45 h-45 object-cover bg-black"
          />
        </div>
      </div>

      <div className="mt-20 px-4 pb-10">
        <h1 className="text-xl font-bold text-white">
          {user.username || user.userName}
        </h1>
        <span className="text-gray-400 text-sm font-semibold">{user.email}</span>

        <div className="w-full h-auto border-t mt-2 border-[var(--color-border-soft)]">
          <h1 className="font-bold text-lg text-gray-200 mt-2">{posts.length > 0 ? "My posts" : ""}</h1>
          {!isLoading ? (
            <div className="px-3 py-2">
              {posts.length > 0 ? (
                <List items={posts} isMe onReload={handleReloadPost} />
              ): (
                <div className="flex flex-col items-center mt-10">
                  <span className="text-xl font-bold">Bạn chưa có bất ký bài viết nào!</span>
                  <span className="text-lg font-semibold">Hãy chia sẻ nên những cảm xúc đầu tiên của bạn.</span>
                </div>
              )}
              {hasMore && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  Đang tải thêm...
                </div>
              )}
            </div>
          ) : (
            <AnimationLoader show={true} message="Đang lấy dữ liệu..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
