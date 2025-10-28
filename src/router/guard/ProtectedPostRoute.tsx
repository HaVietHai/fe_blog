import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import PostDetail from "../../pages/Blog-Pages/DetailPost/PostDetail";
import PostDetailPreview from "../../pages/Blog-Pages/DetailPost/PostDetailPreview";

export default function ProtectedPostRoute() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { postId } = useParams();

  if (isLoggedIn) {
    return <PostDetail key={postId} />;
  } else {
    return <PostDetailPreview key={postId} />;
  }
}
