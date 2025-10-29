import { useNavigate } from "react-router-dom"
import { IconLucide } from "../IconLucide"
import type React from "react";
import { div } from "framer-motion/client";

interface IProps {
    isDetail: boolean,
    title?: string,
    numberPost?: number,
    isIcons?: boolean
}

const Header: React.FC<IProps> = ({
    isDetail, title, numberPost, isIcons
}) => {

    const navigate = useNavigate();

    return (
        <div className={`fixed top-0 left-72 w-212 xl:w-212 ${!isDetail ? "h-15" : "h-10"} bg-black border-b border-[var(--color-border-soft)] flex items-center p-3 z-50`}>
            <button
                onClick={() => navigate(-1)}
                className="hover:cursor-pointer flex flex-row justify-center items-center"
            >
                {isIcons ? (
                    <div className="h-8 w-8 rounded-full hover:bg-gray-700">
                        <IconLucide name="ArrowLeft" className={"w-5 h-5 mt-[6px] ml-[5px]"} />
                    </div>
                ) : (
                    <div></div>
                )}
                {!isDetail ? (
                    <div className="flex flex-col">
                        <h1 className="ml-1 font-semibold text-lg flex-1">{title?.toUpperCase()}</h1>
                        <span className="text-sm text-gray-400 font-mono flex-1 ml-1">{numberPost}post</span>
                    </div>
                ) : (
                    <span
                        className="font-bold text-xl ml-1.5 text-gray-300"
                    >
                        {title}
                    </span>
                )}
            </button>
        </div>
    )
}

export default Header