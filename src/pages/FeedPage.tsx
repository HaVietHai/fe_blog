import React, { useEffect, useState } from "react"
import Post from "../components/Forms/Post"
import type { IPost } from "../types/post.type"
import { handleCreatePost, handleGetPost } from "../services/post.service"
import List from "../components/List"
import errorHandler from "../utils/errorHandle"
import { IconLucide } from "../components/IconLucide"
import { StorageService } from "../services/storage.service"
import { STORAGE_KEY_AUTH_BLOG } from "../constants/key.constant"
import { showNotification } from "../utils/helper"
import ImageGridAddOrUpdate from "../components/ImageGripPre"


const FeedPage = () => {

  const [allowed, setAllowed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPost, setIsPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1)
  const [imgPreview, setImgPrevire] = useState<(string | File)[]>([])
  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const user = token.user


  const [formPost, setFormPost] = useState<IPost>({
    title: "",
    authorId: user._id || user.id,
    images: [] as File[],
  })

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormPost(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectedFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImgPrevire((prev) => [...prev, ...newFiles]); // chỉ lưu file thật
    setFormPost((prev) => ({
      ...prev,
      images: [...(prev.images as File[]), ...newFiles],
    }));
  };


  const handleOnPost = async (e: React.ChangeEvent<HTMLButtonElement | HTMLAreaElement>) => {
    e.preventDefault();
    try {
      setIsPost(true);
      // Cau hinh dung kieu multipart/form-data
      const formData = new FormData()
      formData.append("title", formPost.title ? formPost.title : " ");
      formData.append("authorId", formPost.authorId ? formPost.authorId : user.id)

      formPost.images?.forEach((file: File) => {
        formData.append("images", file)
      })

      await handleCreatePost(formData)

      setImgPrevire([])
      setFormPost({ title: "", authorId: user.id || user._id, images: [] })
      await handleLoadPost(1); // Ve ngay trang dau de thay luon post moi nhat
      // Ban thong bao
      showNotification({ type: "success", message: "Bài viết đã được đăng lên.", duration: 5000 })
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsPost(false);
    }
  }

  const handleRemovePrev = (itemSelected: number) => {
    setImgPrevire(imgPreview.filter((value, index) => index !== itemSelected))
  }

  const handleLoadPost = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await handleGetPost(page);
      setPosts(response.posts);
    } catch (error) {
      errorHandler(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (formPost.title && formPost.title.trim().length > 0) {
      setAllowed(true);
    } else if (imgPreview && imgPreview.length > 0) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [formPost.title, imgPreview, page])

  // Load du lieu tai trang 1
  useEffect(() => {
    handleLoadPost(1)
  }, [])

  // Load du lieu khi page thay doi
  useEffect(() => {
    handleLoadPost(page)
  }, [page])
  
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Phần nhập post */}
      <Post
        name="title"
        onPost={handleOnPost}
        allowed={allowed}
        isLoading={isPost}
        value={formPost.title ? formPost.title : ""}
        onChange={handleChangeForm}
        onFlieSelected={handleSelectedFiles}
      />
      {imgPreview.length > 0 && (
        <div className="bg-[var(--color-brand-dark)] flex flex-row p-4 rounded-[var(--radius-card)] shadow-[var(--shadow-glow)]">
          <ImageGridAddOrUpdate
            images={imgPreview}
            onRemove={(index) => setImgPrevire(prev => prev.filter((_, indexItem) => indexItem !== index))}
          />
        </div>
      )}
      {/* List Bài viết */}
      <List items={posts} />
    </div>
  )
}

export default FeedPage