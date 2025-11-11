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
import { handleGetCommentOwner } from "../../services/comment.service";
import { motion, AnimatePresence } from "framer-motion";
import type { IComment } from "../../types/comment.type";

const SCROLL_KEY = "profileScrollY";

type Tab = "posts" | "comments";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [tab, setTab] = useState<Tab>("posts"); // Mặc định "posts"
  const [initialized, setInitialized] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const user = token?.user || {};
  const id = user.id || user._id;

  // Lưu scroll
  const handleSaveScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem(SCROLL_KEY, String(scrollRef.current.scrollTop));
    }
  };

  // Restore scroll
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

  // Load posts
  const handleGetOwnerPost = useCallback(
    async (page: number, append = false) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setIsLoading(true);
      try {
        const response = await handleGetPostOwner(id, page);
        setPosts((prev) =>
          append ? [...prev, ...(response.posts || [])] : response.posts || []
        );
        const totalPages = response.pagination?.totalPages || 1;
        setHasMore(page < totalPages);
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

  // Load comments
  const handleGetOwnerComments = useCallback(
    async (page: number, append = false) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setIsLoading(true);
      try {
        const response = await handleGetCommentOwner(id, page);
        console.log(response);
        
        setComments((prev) =>
          append ? [...prev, ...(response || [])] : response || []
        );
        const totalPages = response.pagination?.totalPages || 1;
        setHasMore(page < totalPages);
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

  // Reload
  const handleReload = async () => {
    setPage(1);
    if (tab === "posts") await handleGetOwnerPost(1);
    else await handleGetOwnerComments(1);
  };

  // Init load
  useEffect(() => {
    const init = async () => {
      await handleGetOwnerPost(1);
      setInitialized(true);
    };
    init();
  }, [id, handleGetOwnerPost]);

  // Load khi đổi tab
  useEffect(() => {
    if (!initialized) return;

    setPage(1); // reset về page đầu
    if (tab === "posts") {
      handleGetOwnerPost(1);
    } else {
      handleGetOwnerComments(1);
    }
  }, [tab, initialized, handleGetOwnerPost, handleGetOwnerComments]);

  // Infinite scroll
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
    if (tab === "posts") handleGetOwnerPost(page, true);
    else handleGetOwnerComments(page, true);
  }, [page, initialized, handleGetOwnerPost, handleGetOwnerComments, tab]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div
      ref={scrollRef}
      className="relative h-full overflow-y-auto bg-black text-white font-inter no-scrollbar"
    >
      {/* Header with fade-in */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Header
          isDetail={false}
          title={user.username || user.userName}
          numberPost={posts.length}
          isIcons={true}
        />
      </motion.div>

      {/* Banner & Avatar */}
      <div className="w-full h-90 bg-black flex flex-col relative">
        <motion.div
          className="absolute overflow-hidden w-full h-85 bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={user.banner || avatar}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <motion.div
          className="flex flex-row relative w-45 h-45 overflow-hidden rounded-full top-65 left-3 border-4 border-black"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <img
            src={user.avatar || avatar}
            className="w-45 h-45 object-cover bg-black"
          />
        </motion.div>
      </div>

      <motion.div className="mt-20 px-4 pb-10" initial="hidden" animate="visible" variants={fadeInUp}>
        <h1 className="text-2xl font-bold text-white">
          {user.username || user.userName}
        </h1>
        <span className="text-gray-400 text-sm font-medium">{user.email}</span>

        {/* Tabs */}
        <div className="flex mt-4 border-b border-gray-700">
          <motion.button
            style={{ color: "#9ca3af" }}
            onClick={() => { setTab("posts"); setPage(1); }}
            className={`px-4 py-2 font-semibold ${tab === "posts" ? "border-b-2 border-cyan-400 text-white" : "text-gray-400"
              }`}
            whileHover={{ scale: 1.05, color: "#22d3ee" }}
          >
            My posts
          </motion.button>
          <motion.button
            style={{ color: "#9ca3af" }}
            onClick={() => { setTab("comments"); setPage(1); }}
            className={`px-4 py-2 font-semibold ${tab === "comments" ? "border-b-2 border-cyan-400 text-white" : "text-gray-400"
              }`}
            whileHover={{ scale: 1.05, color: "#22d3ee" }}
          >
            My comments
          </motion.button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.div
              key={tab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {tab === "posts" ? (
                posts.length > 0 ? (
                  <List items={posts} isMe onReload={handleReload} />
                ) : (
                  <div className="flex flex-col items-center mt-10">
                    <span className="text-xl font-bold">Bạn chưa có bất kỳ bài viết nào!</span>
                    <span className="text-lg font-medium">Hãy chia sẻ những cảm xúc đầu tiên của bạn.</span>
                  </div>
                )
              ) : comments.length > 0 ? (
                <List items={comments} isMe onReload={handleReload} avatar={user.avatar}/>
              ) : (
                <div className="flex flex-col items-center mt-10">
                  <span className="text-xl font-bold">Bạn chưa có bình luận nào!</span>
                </div>
              )}
            </motion.div>
          ) : (
            <AnimationLoader show={true} message="Đang lấy dữ liệu..." />
          )}
        </AnimatePresence>

        {hasMore && !isLoading && (
          <motion.div className="text-center py-4 text-gray-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Đang tải thêm...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
