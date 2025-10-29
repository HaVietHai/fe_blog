import type React from "react"
import { IconLucide } from "../IconLucide"

interface IProps {
    viewFooter: number,
    countComment?: number,
    countLiked?: number | 0,
    isLiked?: boolean,
    onLiked?: () => void,
    onChat?: () => void,
    onShare?: () => void,
    onRepost?: () => void,
    onSave?: () => void
}

const Footer: React.FC<IProps> = ({
    viewFooter, countComment, countLiked,
    isLiked, onLiked, onChat, onShare, onRepost, onSave
}) => {

    const handleChat = () =>{
        console.log("Tin nhan");
    }

    return (
        <>
            {viewFooter == 1 && (
                <div className="flex flex-row justify-between ml-16 mt-3">
                    <div
                        onClick={onChat}
                        className="order-1 flex flex-row hover:text-cyan-500"
                        title="Reply"
                    >
                        <IconLucide
                            name="MessageCircle"
                            className="w-5 h-5  hover:cursor-pointer transition-all duration-300"
                        />
                        <span
                            className="text-sm ml-1"
                        >
                            {countComment}
                        </span>
                    </div>
                    <div
                        onClick={onLiked}
                        title="Like"
                        className={`hover:text-red-500 order-2 w-fit flex flex-row hover:cursor-pointer `}

                    >
                        <IconLucide
                            name="Heart"
                            className={`w-5 h-5 transition-all duration-200
                            ${isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"}`}
                        />
                        <span
                            className={`text-sm ml-1 
                                ${isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"}
                            `}
                        >
                            {countLiked}
                        </span>
                    </div>
                    <div
                        onClick={onRepost}
                        className="order-3"
                        title="Repost"
                    >
                        <IconLucide name="Shuffle" className="w-5 h-5 transition-all duration-300 hover:text-green-500 hover:cursor-pointer" />
                    </div>
                    <div
                        className="flex flex-row order-4 space-x-2"
                    >
                        <div
                            onClick={onSave}
                            className=""
                            title="Save"
                        >
                            <IconLucide name="Bookmark" className="w-5 h-5 hover:text-cyan-500 hover:cursor-pointer" />
                        </div>
                        <div
                            onClick={onShare}
                            className=""
                            title="Share"
                        >
                            <IconLucide name="Share" className="w-5 h-5 hover:text-cyan-500 hover:cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}
            {viewFooter == 2 && (
                <div className="flex flex-row h-10 p-2 justify-between border-t border-b border-[var(--color-border-soft)]">
                    <div
                        title="Repost"
                        className=" hover:text-green-500 self-center hover:cursor-pointer"
                    >
                        <IconLucide name="Shuffle" className={`w-5 h-5`} />
                    </div>
                    <div
                        onClick={onLiked}
                        title="Like"
                        className={`hover:text-red-500 w-fit flex flex-row hover:cursor-pointer `}
                    >
                        <IconLucide
                            name="Heart"
                            className={`w-5 h-5 transition-all duration-200
                            ${isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"}`}
                        />
                        <span
                            className={`text-sm ml-1 
                                ${isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"}
                            `}
                        >
                            {countLiked}
                        </span>
                    </div>
                    <div
                        title="Save"
                        className="hover:text-cyan-500 self-center hover:cursor-pointer"
                    >
                        <IconLucide name="Bookmark" className={`w-5 h-5`} />
                    </div>
                    <div
                        title="Share"
                        className="hover:text-cyan-500 self-center hover:cursor-pointer"
                    >
                        <IconLucide name="Share" className={`w-5 h-5`} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Footer