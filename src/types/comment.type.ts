import type { IUser } from "./user.type"

export interface IComment{
    _id?: string
    content: string,
    images?: string[],
    liked?: string[],
    postId?: string,
    authorId?: IUser,
}

export interface ICommentRequestDto{
    comments: IComment[],
    pagination: number
}

export interface ILikeComment{
    commentId: string,
    authorId: string
}