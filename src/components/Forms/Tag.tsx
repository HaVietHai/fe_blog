import type React from 'react'
import { IconLucide } from '../IconLucide'
import { useRef } from 'react';

interface Props {
    onFileSelect?: (files: FileList | null) => void,
    onGIF?: () => void,
    onEmoji?: () => void,
    onHastag?: () => void
}

const Tag: React.FC<Props> = ({
    onFileSelect, onEmoji, onGIF, onHastag
}) => {

    // 1. Tạo một ref để tham chiếu đến input file ẩn
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 2. Hàm xử lý khi bấm nút Media
    const handleMediaClick = () => {
        // Kích hoạt sự kiện click của input file ẩn
        fileInputRef.current?.click();
    };

    // 3. Hàm xử lý khi người dùng chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Gọi callback prop và truyền danh sách file đã chọn lên component cha
        if (onFileSelect) {
            onFileSelect(event.target.files);
        }
        // Reset giá trị input để có thể chọn lại cùng file
        if (event.target) {
            event.target.value = '';
        }
    };

    return (
        <div className="flex flex-row mt-5">
            <button
                onClick={handleMediaClick}
                title="Media"
                className="hover:cursor-pointer"
                type="button"
            >
                <IconLucide name="Image" className="w-5 h-5 text-[var(--color-brand-cyan)] ml-1" />
            </button>

            {/* Input file ẩn */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*" // Chỉ chấp nhận file ảnh
                multiple // Cho phép chọn nhiều ảnh
                className="hidden" // Ẩn input này đi
            />

            <button
                onClick={onGIF}
                title="GIF"
                className="hover:cursor-pointer"
                type="button"
            >
                <IconLucide name="SquareSigma" className="w-5 h-5 text-[var(--color-brand-cyan)] ml-3" />
            </button>
            <button
                onClick={onEmoji}
                title="Emoji"
                className="hover:cursor-pointer"
                type="button"
            >
                <IconLucide name="Smile" className="w-5 h-5 text-[var(--color-brand-cyan)] ml-3" />
            </button>
            <button
                onClick={onHastag}
                title="Hastag"
                className="hover:cursor-pointer"
                type="button"
            >
                <IconLucide name="Hash" className="w-5 h-5 text-[var(--color-brand-cyan)] ml-3" />
            </button>
        </div>
    )
}

export default Tag