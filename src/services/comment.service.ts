import { createComment, getCommentByPost } from "../api/comment.api"
import type { IComment, ICommentRequestDto } from "../types/comment.type"

export const handleGetComment = async(postId: string, page: number):Promise<ICommentRequestDto> =>{
    return await getCommentByPost(postId,page)
}

export const handleReplyPost = async(postId: string, data: any):Promise<any> =>{
    if (!postId) return;
    return await createComment(postId, data)
}