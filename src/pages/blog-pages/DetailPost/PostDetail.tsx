import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react";
import type { IPost } from "../../../types/post.type";
import errorHandler from "../../../utils/errorHandle";
import { handleGetPostById } from "../../../services/post.service";
import { IconLucide } from "../../../components/IconLucide";
import { STORAGE_KEY_AUTH_BLOG } from "../../../constants/key.constant";
import { handleGetComment } from "../../../services/comment.service";
import type { IComment } from "../../../types/comment.type";
import Footer from "../../../components/Forms/Footer";
import List from "../../../components/List";
import ViewPostDetail from "../../../components/ViewPostDetail";
import { StorageService } from "../../../services/storage.service";
import { useLikeToggle } from "../../../hook/useLikeToggle";


const PostDetail = () => {

  const { postId } = useParams();
  const navigate = useNavigate();
  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [originalPost, setOriginalPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [allowed, setAllowed] = useState<boolean>(false);

  // Lấy authUserId (giữ nguyên)
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  useEffect(() => {
    const authData = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
    if (authData && authData.user && (authData.user.id || authData.user._id)) {
      setAuthUserId(authData.user._id || authData.user.id);
    }
  }, []);

  // BƯỚC 3: "Ghi nhớ" mảng post
  // Mảng này sẽ chỉ được tạo mới khi `originalPost` thực sự thay đổi
  const postArray = useMemo(() => {
    return originalPost ? [originalPost] : [];
  }, [originalPost]);

  // BƯỚC 4: Sử dụng mảng đã "ghi nhớ" ở trên
  const {
    internalItems: internalPosts,
    handleToggleLike
  } = useLikeToggle(postArray, authUserId); // <-- Đã sửa

  // post bây giờ sẽ được lấy từ state nội bộ của hook
  const post = internalPosts[0];

  // Đây là vị trí ĐÚNG của hàm loadData (giữ nguyên)
  const loadData = async (postId: string, page: number) => {
    if (!postId) return;
    try {
      setisLoading(true);
      const [dataPost, dataComment] = await Promise.all([
        handleGetPostById(postId),
        handleGetComment(postId, page)
      ]);

      setOriginalPost(dataPost);
      setComments(dataComment?.comments || []);
    } catch (error) {
      errorHandler(error);
    } finally {
      setisLoading(false);
    }
  }  

  useEffect(() => {
    if (postId) {
      loadData(postId, page);
    }
  }, [postId, page]);

  // Tạo các biến 'isLiked' và 'likeCount' (giữ nguyên)
  const isLiked = authUserId ? (post?.liked || []).includes(authUserId) : false;
  const likeCount = (post?.liked || []).length;

  return (
    <div className="relative min-h-screen bg-black text-white w-auto">
      {/* Header cố định */}
      <div className="fixed top-0 left-72 w-212 h-10 bg-black border-b border-[var(--color-border-soft)] flex items-center p3 z-50">
        <button onClick={() => navigate(-1)}>
          <IconLucide name="ArrowLeft" className="text-white hover:brightness-110 hover:text-cyan-500 w-5 h-5" />
        </button>
        <span
          onClick={() => navigate('/feed', { replace: true })}
          className="font-semibold text-xl ml-1.5 hover:cursor-pointer hover:text-cyan-500"
        >
          Community Post
        </span>
      </div>
      {/* Bài post chi tiết */}
      <div className="flex flex-col p-4 pt-7">
        <div className="flex flex-col space-y-4">
          <ViewPostDetail post={post} />
          <Footer
            viewFooter={2}
            countLiked={likeCount}
            isLiked={isLiked}
            onLiked={() => post && handleToggleLike(post)}
          />
          <div className="flex flex-row space-x-2">
            <img src={token.user.avatar} className="w-12 h-12 mb-5" />
            <div className="flex flex-row justify-between w-full">
              <textarea
                onClick={() => setAllowed(true)}
                placeholder="Post your reply"
                className="flex-1 text-lg mt-3 bg-transparent text-[var(--color-text-main)] outline-none resize-none"
              />
              <button
                type="button"
                className="hover:cursor-not-allowed h-fit mt-3 rounded-full px-6 py-2 bg-gray-500"
              >
                <span className="font-bold text-sm text-black">
                  Reply
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Danh sách bình luận */}
        <div className="w-full border-t border-[var(--color-border-soft)]">
          <div className="">
            {comments && comments.length !== 0 ? (
              <div>
                <span className="text-sm text-gray-400">Các phản hồi gần đây</span>
              </div>
            ) : (
              <div></div>
            )}
            {comments && comments.length !== 0 ? (
              <div className="p-2 md:w-130 w-180 flex flex-row justify-center items-center ml-5">
                <List items={comments} />
              </div>
            ) : (
              <div className="justify-center items-center flex-row flex">
                <span className="font-semibold">Hãy trở thành người comment đầu tiên của bài viết này.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail