import type { IComment, ICommentRequestDto, ILikeComment } from "../types/comment.type";
import client, { clientMultipart } from "./client.api";

export const getCommentByPost = async(postId: string, page: number):Promise<ICommentRequestDto> =>{
    return await client.post(`/api/v1/comment/${postId}/${page}`)
}

export const getCommentOwner = async(authorId: string, page: number):Promise<any> => {
    const currentId = authorId 
    return await client.post(`/api/v1/comment/ownerComments/${currentId}/${page}`)
}

export const createComment = async(postId: string, data: any)=>{
    return await clientMultipart.post(`/api/v1/comment/create/${postId}`,data)
}

export const removeComment = async(id: string, authorId: string) =>{
    return await client.post(`/api/v1/comment/${id}`, authorId)
}

export const likeComment = async(data: ILikeComment):Promise<void> =>{
    const { targetId, currentId } = data
    return await client.post(`/api/v1/comment/like/${targetId}/${currentId}`);
}

export const unlikeComment = async(data: ILikeComment):Promise<void> =>{
    const { targetId, currentId } = data
    return await client.post(`/api/v1/comment/unlike/${targetId}/${currentId}`)
}