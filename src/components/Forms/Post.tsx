import type React from "react"
import { useState } from "react";
import OverlayLoading from "../OverlayLoading";
import { StorageService } from "../../services/storage.service";
import { STORAGE_KEY_AUTH_BLOG } from "../../constants/key.constant";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";
import TextArea from "./TextArea";

interface IProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    allowed: boolean;
    onPost: (e: React.ChangeEvent<HTMLButtonElement | HTMLAreaElement>) => void,
    isLoading: boolean,
    onFlieSelected?: (files: FileList | null) => void,
}

const Post: React.FC<IProps> = ({
    value, onChange, allowed, name, isLoading, onFlieSelected, onPost
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
                <TextArea
                    handleSetOnClick={handleSetOnClick}
                    name={name}
                    onChange={onChange}
                    value={value}
                />
                {underline && underline ? (
                    <div className="h-[1px] bg-gray-700 sticky" />
                ) : (
                    <></>
                )}
                <div className="flex flex-row justify-between">
                    <Tag onFileSelect={onFlieSelected} />
                    {allowed && allowed ? (
                        <button
                            type="button"
                            onClick={onPost}
                            className={`hover:cursor-pointer flex flex-row mt-3 px-6 py-2 rounded-full text-white font-medium transition-all hover:brightness-110`}
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