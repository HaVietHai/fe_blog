import Post from "../../components/Forms/Post"
import List from "../../components/List"

const FeedPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Phần nhập post */}
      <Post />
      {/* List Bài viết */}
      <List/>
    </div>
  )
}

export default FeedPage