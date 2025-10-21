export interface IPost{
    title: string,
    content?: string,
    images?: string[],
    isActive?: boolean,
    authorId: string
}