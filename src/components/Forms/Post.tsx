import type React from "react"
import { useState } from "react";
import OverlayLoading from "../OverlayLoading";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";

interface IProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    allowed: boolean;
    onPost: (e: React.ChangeEvent<HTMLButtonElement>) => void,
    isLoading: boolean
}

const Post: React.FC<IProps> = ({
    value, onChange, allowed, name, isLoading
}) => {

    const [underline, setUnderline] = useState<boolean>(false)
    const user = StorageService.getItem(STORAGE_KEY_AUTH_BLOG);
    const navigate = useNavigate();

    const handleSetOnClick = () => {
        setUnderline(true);
    }

    return (
        <div className="bg-[var(--color-brand-dark)] flex flex-row p-4 rounded-[var(--radius-card)] shadow-[var(--shadow-glow)]">
            <img
                onClick={() => navigate('/profile')}
                alt="UserAvatar"
                src={user.user.avatar}
                className="w-12 h-12 rounded-full hover:cursor-pointer hover:bg-white hover:border-1"
            />
            <div className="flex flex-col ml-3 w-full">
                <textarea
                    onClick={handleSetOnClick}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Bạn đang nghĩ gì?"
                    className="w-full text-lg mt-2 bg-transparent text-[var(--color-text-main)] outline-none resize-none"
                />
                {underline && underline ? (
                    <div className="h-[1px] bg-gray-700 sticky" />
                ) : (
                    <></>
                )}
                <div className="flex flex-row justify-between">
                    <Tag/>
                    {allowed && allowed ? (
                        <button
                            className={`hover:cursor-pointer mt-3 px-6 py-2 rounded-full text-white font-medium transition-all hover:brightness-110`}
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <OverlayLoading show={isLoading} />
                            Post
                        </button>
                    ) : (
                        <button
                            className={`bg-gray-400 hover:cursor-not-allowed mt-3 px-6 py-2 rounded-full text-black font-medium transition-all`}
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