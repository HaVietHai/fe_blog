import React, { useEffect, useState, useRef } from "react";
import Post from "../components/Forms/Post";
import type { IPost } from "../types/post.type";
import { handleCreatePost, handleGetPost } from "../services/post.service";
import List from "../components/List";
import errorHandler from "../utils/errorHandle";
import { StorageService } from "../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant";
import { showNotification } from "../utils/helper";
import ImageGridAddOrUpdate from "../components/ImageGripPre";
import { useFeedContext } from "../context/FeedContext";
import AnimationLoader from "../components/AnimationLoader";

const SCROLL_KEY = "feedScrollY";
const LAST_VISIT_KEY = "lastFeedVisit";
const CACHE_DURATION = 5 * 1000; // 5s

const FeedPage: React.FC = () => {
  const { posts, setPosts } = useFeedContext();
  const [allowed, setAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [imgPreview, setImgPreview] = useState<(string | File)[]>([]);
  const [formPost, setFormPost] = useState<IPost>({
    title: "",
    authorId: "",
    images: [],
  });

  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const user = token?.user || {};

  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false); // chặn spam scroll

  // Lưu và khôi phục vị trí scroll
  const handleSaveScroll = () => {
    if (containerRef.current)
      sessionStorage.setItem(SCROLL_KEY, String(containerRef.current.scrollTop));
  };

  const restoreScrollAfterRender = (tryCount = 0) => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (!saved || !containerRef.current) return;
    const y = Number(saved) || 0;
    const container = containerRef.current;

    requestAnimationFrame(() => {
      const canScroll = container.scrollHeight > y + container.clientHeight;
      if (canScroll || tryCount > 5) {
        container.scrollTo(0, y);
      } else {
        setTimeout(() => restoreScrollAfterRender(tryCount + 1), 80);
      }
    });
  };

  // Hàm load bài viết
  const handleLoadPost = async (page: number, append = false) => {
    if (loadingRef.current) return; // chặn gọi song song
    loadingRef.current = true;
    setIsLoading(true);
    try {
      const response = await handleGetPost(page);
      setPosts((prev) =>
        append ? [...prev, ...(response.posts || [])] : response.posts || []
      );

      const totalPages = response.pagination?.totalPages || 1;
      const totalPosts = response.pagination?.totalPosts || 0;

      setHasMore(page < totalPages);
      sessionStorage.setItem("totalFeedPages", String(totalPages));
      sessionStorage.setItem(LAST_VISIT_KEY, Date.now().toString());

      if (!append) {
        await new Promise((r) => setTimeout(r, 150));
        restoreScrollAfterRender();
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  };

  // Infinite scroll
  useEffect(() => {
    if (!initialized || !containerRef.current) return;
    const el = containerRef.current;

    let lastTrigger = 0;
    const onScroll = () => {
      if (isLoading || !hasMore || loadingRef.current) return;
      handleSaveScroll();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 200;

      // chống spam — chỉ cho phép gọi mới mỗi 400ms
      const now = Date.now();
      if (nearBottom && now - lastTrigger > 400) {
        lastTrigger = now;
        setPage((prev) => prev + 1);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [initialized, hasMore, isLoading]);

  // Load thêm khi page đổi
  useEffect(() => {
    if (!initialized || page === 1) return;
    handleLoadPost(page, true);
  }, [page, initialized]);

  // Khởi tạo lần đầu
  useEffect(() => {
    const initFeed = async () => {
      const lastVisit = sessionStorage.getItem(LAST_VISIT_KEY);
      const expired =
        !lastVisit || Date.now() - Number(lastVisit) >= CACHE_DURATION;
      if (posts.length > 0 && !expired) {
        restoreScrollAfterRender();
        setInitialized(true);
        return;
      }
      await handleLoadPost(1);
      setInitialized(true);
    };
    initFeed();
  }, []);

  // Xử lý Post mới
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectedFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImgPreview((prev) => [...prev, ...newFiles]);
    setFormPost((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newFiles],
    }));
  };

  const handleOnPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsPost(true);
      const formData = new FormData();
      formData.append("title", formPost.title?.trim() || " ");
      formData.append("authorId", user._id || user.id || "");
      (formPost.images || []).forEach((file: File) =>
        formData.append("images", file)
      );

      await handleCreatePost(formData);
      await handleLoadPost(1);
      setImgPreview([]);
      setFormPost({ title: "", authorId: user._id || user.id, images: [] });
      showNotification({
        type: "success",
        message: "Bài viết đã được đăng lên.",
        duration: 3000,
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsPost(false);
    }
  };

  useEffect(() => {
    setAllowed(
      (formPost.title && formPost.title.trim().length > 0) ||
        imgPreview.length > 0
    );
  }, [formPost.title, imgPreview]);
  return (
    <div
      id="feed-scroll-container"
      ref={containerRef}
      className="h-full overflow-y-auto no-scrollbar bg-black text-white"
    >
      <div className="max-w-3xl mx-auto space-y-4 p-4">
        <Post
          name="title"
          onPost={handleOnPost as any}
          allowed={allowed}
          isLoading={isPost}
          value={formPost.title || ""}
          onChange={handleChangeForm}
          onFlieSelected={handleSelectedFiles}
        />

        {imgPreview.length > 0 && (
          <div className="bg-[var(--color-brand-dark)] flex flex-row p-4 rounded-[var(--radius-card)] shadow-[var(--shadow-glow)]">
            <ImageGridAddOrUpdate
              images={imgPreview}
              onRemove={(index) =>
                setImgPreview((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </div>
        )}

        <List items={posts} />
        {isLoading && <AnimationLoader show={true} message="Đang tải..." />}
        {!hasMore && (
          <div className="text-center text-gray-500 py-4">Hết bài viết...</div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
