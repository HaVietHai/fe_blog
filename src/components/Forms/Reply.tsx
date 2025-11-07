import React, { useState } from "react"
import Tag from "./Tag";
import type { User } from "../../types/user.type";

interface IProps {
    currentUser: User
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFlieSelected?: (files: FileList | null) => void,
    onReply: (e: React.ChangeEvent<HTMLButtonElement>) => void,
    isNull: boolean,
    name: string,
    content: string
}

const Reply: React.FC<IProps> = ({
    currentUser, onChange, onFlieSelected, isNull, onReply, name, content
}) => {

    const [allowed, setAllowed] = useState<boolean>(false)

    return (
        <div className="flex flex-col mb-2">
            <div className="flex flex-row space-x-2">
                <img src={currentUser.avatar} className="w-12 h-12 mb-5" />
                <div className="flex flex-row justify-between w-full">
                    <textarea
                        onChange={onChange}
                        name={name}
                        value={content}
                        onClick={() => setAllowed(true)}
                        placeholder="Post your reply"
                        className="flex-1 text-lg mt-3 bg-transparent text-[var(--color-text-main)] outline-none resize-none"
                    />
                    {isNull ? (
                        <div>
                            <button
                                type="button"
                                onClick={onReply}
                                className="hover:cursor-pointer h-fit mt-3 rounded-full px-6 py-2 bg-cyan-400"
                            >
                                <span className="font-bold text-sm text-gray-200">
                                    Reply
                                </span>
                            </button></div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                className="hover:cursor-not-allowed h-fit mt-3 rounded-full px-6 py-2 bg-gray-500"
                            >
                                <span className="font-bold text-sm text-black">
                                    Reply
                                </span>
                            </button>
                        </div>
                    )
                    }
                </div>
            </div>
            {allowed && (
                <div className="ml-13">
                    <Tag onFileSelect={onFlieSelected} />
                </div>
            )}
        </div>
    )
}

export default Reply