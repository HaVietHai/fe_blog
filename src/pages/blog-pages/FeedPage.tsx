import React, { useEffect, useState } from "react"
import Post from "../../components/Forms/Post"
import type { IPost } from "../../types/post.type"
import { handleGetPost } from "../../services/post.service"
import List from "../../components/List"
import errorHandler from "../../utils/errorHandle"


const FeedPage = () => {

  const [allowed, setAllowed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1)

  const [formPost, setFormPost] = useState<IPost>({
    title: "",
    authorId: "",
    userName: ""
  })

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormPost(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOnPost = (e: React.ChangeEvent<HTMLButtonElement | HTMLAreaElement>) => {
    e.preventDefault();


  }

  const handleLoadPost = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await handleGetPost(page);
      setPosts(response.posts);
    } catch (error) {
      errorHandler(error)
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadPost(page);
    setAllowed(formPost.title.trim().length > 0);
  }, [formPost.title, page])  

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Phần nhập post */}
      <Post name="title" onPost={handleOnPost} allowed={allowed} isLoading={isLoading} value={formPost.title} onChange={handleChangeForm} />
      {/* List Bài viết */}
      <List items={posts} />
    </div>
  )
}

export default FeedPage