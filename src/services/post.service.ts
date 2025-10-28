import { likeComment, unlikeComment } from "../api/comment.api";
import { createPost, getPost, getPostById, likePost, removePost, unlikePost, updatePost } from "../api/post.api";
import type { IComment } from "../types/comment.type";
import type { ILikePost, IPost, IPostRequestDto } from "../types/post.type";

export const handleCreatePost = async(data: IPost):Promise<IPost> =>{
    return await createPost(data)
}

export const handleGetPost = async(page: number):Promise<IPostRequestDto> =>{
    return await getPost(page)
}

export const handleGetPostById = async(postId: string):Promise<IPost> =>{
    return await getPostById(postId);
}

export const handleRemovePost = async(postId: string):Promise<void> =>{
    return await removePost(postId)
}

export const handleUpdatePost = async(postId: string, data: IPost):Promise<IPost> =>{
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
