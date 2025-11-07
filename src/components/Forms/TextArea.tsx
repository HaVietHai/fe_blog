import type React from "react"

interface IProps{
    label?: string,
    handleSetOnClick?: () => void,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    lengthInput?: number,
    isEdit?: boolean
}

const TextArea:React.FC<IProps> = ({
    handleSetOnClick, name, value, onChange, label, lengthInput, isEdit
}) => {
    return (
        <div className="p-2">
            {label && (
                <div className="text-md font-semibold">
                    <span>{label}</span>
                </div>
            )}
            <textarea
                onClick={handleSetOnClick}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Bạn đang nghĩ gì?"
                className={`${isEdit ? "p-5 w-full border border-[var(--color-border-soft)] rounded-md": ""} break-after-right text-lg mt-2 bg-transparent text-[var(--color-text-main)] outline-none resize-none`}
            />
            {lengthInput >= 0 && (
                <div className="absolute right-112 mb-1">
                    <span className=" text-white text-center">{lengthInput}/1800 kí tự</span>
                </div>
            )}
        </div>
    )
}

export default TextArea