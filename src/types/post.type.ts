import type { IUser } from "./user.type"

export interface IPost {
    _id?: string,
    title?: string,
    liked?: string[]
    content?: string,
    authorId?: IUser,
    commentCount?:number,
    isActive?: boolean,
    images?: string[]
}

export interface IPostRequestDto{
    posts: IPost[],
    pagination: number
}

export interface ILikePost{
    postId: string,
    authorId: string
}