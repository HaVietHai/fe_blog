import type React from "react"
import { IconLucide } from "../IconLucide"
import { useState } from "react";

interface IProps {
    name: string;
    value: string;
    onChange: () => void;
    allowed: boolean;
    onPost: (e: React.ChangeEvent<HTMLButtonElement>) => void
}

const Post: React.FC<IProps> = ({
    value, onChange, allowed, name
}) => {

    const [underline, setUnderline] = useState<boolean>(false)

    const handleSetOnClick = () =>{
        setUnderline(true);
    }

    return (
        <div className="bg-[var(--color-brand-dark)] flex flex-row p-4 rounded-[var(--radius-card)] shadow-[var(--shadow-glow)]">
            <img alt="UserAvatar" className="w-12 h-12 rounded-full border-1" />
            <div className="flex flex-col ml-3 w-full">
                <textarea
                    onClick={handleSetOnClick}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Bạn đang nghĩ gì?"
                    className="w-full text-lg bg-transparent text-[var(--color-text-main)] outline-none resize-none"
                />
                {underline && underline ? (
                <div className="h-[1px] bg-gray-700 sticky"/>
                ): (
                    <></>
                )}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row mt-5">
                        <button
                            className="hover:cursor-pointer"
                            type="button"
                        >
                            <IconLucide name="Image" className="text-[var(--color-brand-cyan)] ml-1" />
                        </button>
                        <button
                            className="hover:cursor-pointer"
                            type="button"
                        >
                            <IconLucide name="SquareSigma" className="text-[var(--color-brand-cyan)] ml-3" />
                        </button>
                        <button
                            className="hover:cursor-pointer"
                            type="button"
                        >
                            <IconLucide name="Smile" className="text-[var(--color-brand-cyan)] ml-3" />
                        </button>
                        <button
                            className="hover:cursor-pointer"
                        >
                            <IconLucide name="Hash" className="text-[var(--color-brand-cyan)] ml-3" />
                        </button>
                    </div>
                    {allowed && allowed ? (
                        <button
                            className={`hover:cursor-pointer mt-3 px-6 py-2 rounded-full text-white font-medium transition-all hover:brightness-110`}
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            Post
                        </button>
                    ) : (
                        <button
                            className={`bg-gray-400 hover:cursor-not-allowed mt-3 px-6 py-2 rounded-full text-white font-medium transition-all`}
                        >
                            Post
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post