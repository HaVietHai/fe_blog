import { getCommentByPost } from "../api/comment.api"
import type { ICommentRequestDto } from "../types/comment.type"

export const handleGetComment = async(postId: string, page: number):Promise<ICommentRequestDto> =>{
    return await getCommentByPost(postId,page)
}
