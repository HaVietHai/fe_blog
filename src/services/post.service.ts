import { likeComment, unlikeComment } from "../api/comment.api";
import { createPost, getPost, getPostById, getPostOwner, likePost, removePost, unlikePost, updatePost } from "../api/post.api";
import type { ILikePost, IPost, IPostRequestDto } from "../types/post.type";

export const handleCreatePost = async(data: any):Promise<any> =>{
    return await createPost(data)
}

export const handleGetPost = async(page: number):Promise<IPostRequestDto> =>{
    return await getPost(page)
}

export const handleGetPostById = async(postId: string):Promise<IPost> =>{
    return await getPostById(postId);
}

export const handleGetPostOwner = async(authorId: string, page: number):Promise<IPostRequestDto> =>{
    return await getPostOwner(authorId, page)
}

export const removePostAct = async(postId: string, authorId: string):Promise<void> =>{
    return await removePost(postId, authorId)
}

export const updatePostAct = async(postId: string, data: IPost):Promise<IPost> =>{
    return await updatePost(postId,data);
}

export const handleLikeOrUnlike = async(data: ILikePost, typeFlag: number):Promise<void> =>{
    const { authorId, postId } = data

    if (typeFlag === 1 || typeFlag === 2) {
        if (typeFlag === 1) return await likePost({ authorId: authorId, postId: postId });
        if (typeFlag === 2) return await unlikePost({ authorId: authorId, postId: postId });
    }else if (typeFlag ===3 || typeFlag === 4) {
        const commentId = postId;
        if(typeFlag === 3) return await likeComment({ authorId: authorId, commentId: commentId })
        if(typeFlag === 4) return await unlikeComment({ authorId: authorId, commentId: commentId })
    }else{
        throw new Error("Invalid typeFlag. Must be 1, 2, 3, or 4.")
    }
}
