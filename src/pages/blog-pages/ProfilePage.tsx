import Header from "../../components/Forms/Header";
import avatar from '../../assets/avatar-test/209d0167-7fde-42b8-9831-4930414fe8b2.jpg'
import List from "../../components/List";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import errorHandler from "../../utils/errorHandle";
import { useEffect, useState } from "react";
import type { IPost } from "../../types/post.type";
import { handleGetPostOwner } from "../../services/post.service";
import AnimationLoader from "../../components/AnimationLoader";

const ProfilePage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<IPost[]>([])
  const [numberPost, setNumberPost] = useState<number>(1)
  const token = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
  const user = token.user;
  const id = user.id || user._id  


  const handleGetOwnerPost = async (id: string, page: number) => {
    try {
      const response = await handleGetPostOwner(id, page)

      setPosts(response.posts)
      setNumberPost(response.pagination);
    } catch (error: any) {
      errorHandler(error)
    }
  }

  const handleReloadPost = async () =>{
    await handleGetOwnerPost(id,page)
  }

  useEffect(() => {
    handleGetOwnerPost(id, page)
  }, [page, id])

  return (
    <div className="relative min-h-screen bg-black text-white w-auto">
      {/* Header co dinh */}
      <Header isDetail={false} title={"Username"} numberPost={1} isIcons={true} />
      {/* Body Profile */}
      <div className="w-full h-90 bg-black flex flex-col">
        <div className="absolute overflow-hidden w-full h-85 bg-gray-900">
          <img src={!avatar ? "" : avatar} className="object-cover w-full h-fit" />
        </div>
        <div className="flex flex-row relative w-45 h-45 overflow-hidden rounded-full top-65 left-3 border-4 border-black">
          <img src={user.avatar} className="w-45 h-45 object-cover bg-black" />
        </div>
      </div>
      <div className="mt-20 px-4">
        <h1 className="text-xl font-bold text-white">{user.username || user.userName}</h1>
        <span className="text-gray-400 text-sm font-semibold">{user.email}</span>
        {/* All post cua user day */}
        <div className="w-full h-auto border-t mt-2 border-[var(--color-border-soft)]">
          <h1 className="font-bold text-lg text-gray-200">My posts</h1>
          {!isLoading ? (
            <div className="px-3 py-2">
              <List items={posts} isMe onReload={handleReloadPost}/>
            </div>
          ) : (
            <AnimationLoader show={!isLoading} message="Đang lấy dữ liệu..." />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage