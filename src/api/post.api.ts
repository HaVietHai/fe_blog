import type { ILikePost, IPost, IPostRequestDto } from "../types/post.type";
import client, { clientMultipart } from "./client.api";

export const getPost = async(page: number):Promise<IPostRequestDto> => {
    return await client.post(`/api/v1/post/page/${page}`)
}

export const getPostById = async(postId: string):Promise<IPost> =>{
    return await client.post(`/api/v1/post/postId/${postId}`)
}

export const getPostOwner = async(authorId: string, page: number):Promise<IPostRequestDto> =>{
    return await client.post(`/api/v1/post/${authorId}/${page}`)
}   

export const createPost = async(dto: any):Promise<any> =>{
    return await clientMultipart.post(`/api/v1/post/create`, dto);
}

export const removePost = async(id: string, authorId: string):Promise<void> =>{
    return await client.post(`/api/v1/post/postId/${id}/authorId/${authorId}`)
}

export const updatePost = async(id: string, dto: IPost):Promise<IPost> =>{
    return await client.put(`/api/v1/post/update/${id}`, dto)
}

export const likePost = async(data: ILikePost):Promise<void> =>{
    return await client.post(`/api/v1/post/like/${data.postId}/${data.authorId}`)
}

export const unlikePost = async(data: ILikePost):Promise<void> =>{
    return await client.post(`/api/v1/post/unlike/${data.postId}/${data.authorId}`)
}