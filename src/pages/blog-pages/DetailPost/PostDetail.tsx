import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useMemo, useState } from "react";
import type { IPost } from "../../../types/post.type";
import errorHandler from "../../../utils/errorHandle";
import { handleGetPostById } from "../../../services/post.service";
import { IconLucide } from "../../../components/IconLucide";
import { STORAGE_KEY_AUTH_BLOG } from "../../../constants/key.constant";
import { handleGetComment, handleReplyPost } from "../../../services/comment.service";
import type { IComment } from "../../../types/comment.type";
import Footer from "../../../components/Forms/Footer";
import List from "../../../components/List";
import ViewPostDetail from "../../../components/ViewPostDetail";
import { StorageService } from "../../../services/storage.service";
import { useLikeToggle } from "../../../hook/useLikeToggle";
import Header from "../../../components/Forms/Header";
import Reply from "../../../components/Forms/Reply";
import ImageGridAddOrUpdate from "../../../components/ImageGripPre";
import { showNotification } from "../../../utils/helper";


const PostDetail = () => {

  const { postId } = useParams();
  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const currentUser = token.user;

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isNull, setIsNull] = useState<boolean>(false);
  const [originalPost, setOriginalPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [imgPreview, setImgPreview] = useState<(string | File)[]>([]);
  const [formReply, setFormReply] = useState<IComment>({
    content: '',
    postId: "",
    authorId: "",
    images: []
  })

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormReply(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectedFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImgPreview((prev) => [...prev, ...newFiles])
    setFormReply((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newFiles]
    }))
  }

  // Lấy authUserId (giữ nguyên)
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  useEffect(() => {
    const authData = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
    if (authData && authData.user && (authData.user.id || authData.user._id)) {
      setAuthUserId(authData.user._id || authData.user.id);
    }
  }, []);

  const postArray = useMemo(() => {
    return originalPost ? [originalPost] : [];
  }, [originalPost]);

  const {
    internalItems: internalPosts,
    handleToggleLike
  } = useLikeToggle(postArray, authUserId);

  const post = internalPosts[0];

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

  const handleReply = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("postId", postId || "");
      formData.append("authorId", currentUser.id || currentUser._id || "");
      formData.append("content", formReply.content || "");

      const images = formReply.images || [];
      images.forEach((item) => {
        if (item instanceof File) {
          formData.append("images", item);
        } else if (typeof item === "string") {
          formData.append("existingImages", item);
        }
      });
      await handleReplyPost(postId || "", formData);

      setFormReply({
        content: '',
        postId: postId,
        authorId: currentUser.id || currentUser._id,
        images: []
      })
      setImgPreview([])
      showNotification({
        type: "success",
        message: "Đã phản hồi bài đăng này thành công.",
        duration: 3000
      })

      if (postId) {
        await loadData(postId, 1); // Gọi lại loadData
        setPage(1); // Reset về trang 1
      }

    } catch (error) {
      errorHandler(error);
    }
  }
  useEffect(() => {
    if (postId) {
      loadData(postId, page);
    }
  }, [postId, page]);

  useEffect(() => {
    setIsNull(
      (formReply.content && formReply.content.trim().length > 0) ||
      imgPreview.length > 0
    )
  }, [formReply.content, imgPreview])

  // Tạo các biến 'isLiked' và 'likeCount' (giữ nguyên)
  const isLiked = authUserId ? (post?.liked || []).includes(authUserId) : false;
  const likeCount = (post?.liked || []).length;
  const commentCount = comments?.length || 0;

  return (
    <div className="relative min-h-screen bg-black text-white w-auto">
      {/* Header cố định */}
      <Header isDetail={true} title="Community" isIcons={true} />
      {/* Bài post chi tiết */}
      <div className="flex flex-col p-4 pt-7">
        <div className="flex flex-col space-y-4">
          <ViewPostDetail post={post} commentCount={commentCount}/>
          <Footer
            countComment={commentCount}
            viewFooter={2}
            countLiked={likeCount}
            isLiked={isLiked}
            onLiked={() => post && handleToggleLike(post)}
          />
          <Reply
            content={formReply.content}
            name="content"
            onReply={handleReply}
            isNull={isNull}
            currentUser={currentUser}
            onChange={handleChangeForm}
            onFlieSelected={handleSelectedFiles}
          />
          {imgPreview.length > 0 && (
            <div className="mb-3">
              <ImageGridAddOrUpdate
                images={imgPreview}
                onRemove={(index) => setImgPreview((prev) => prev.filter((_, i) => i !== index))}
              />
            </div>
          )}
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
                <List items={comments} isComment={true} />
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