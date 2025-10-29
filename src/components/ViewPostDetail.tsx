import type React from "react"
import type { IPost } from "../types/post.type"
import { IconLucide } from "./IconLucide"
import ImageGrid from "./ImageGrip"

interface IProps {
    post: IPost,
    images: string[]
}

const ViewPostDetail: React.FC<IProps> = ({
    post
}) => {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-2 mb-3">
                    <img src={post?.authorId.avatar} className="w-12 h-12 rounded-full" />
                    <span className="text-lg font-bold">{post?.authorId.username}</span>
                </div>
                <button className="hover:cursor-pointer w-6 h-6 rounded-full hover:bg-[var(--color-border-soft)]">
                    <IconLucide name="MoreHorizontalIcon" className="w-6 h-6 text-center hover:text-cyan-500" />
                </button>
            </div>
            <div className="px-3 py-3">
                <span className="whitespace-pre-line text-lg">
                    {post?.title}
                </span>
                <span className="whitespace-pre-line text-sm">
                    {post?.content}
                </span>
            </div>
            <ImageGrid
                images={post?.images}
            />
            <span className="text-[var(--color-text-secondary)]">
                · Time to now ·· {post?.commentCount == 0 ? "Chưa có bất kỳ comment nào" : post?.commentCount}
            </span>
        </div>
    )
}

export default ViewPostDetail