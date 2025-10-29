import type React from "react"
import { IconLucide } from "../IconLucide"
import TextArea from "./TextArea"
import type { IPost } from "../../types/post.type"
import ImageGridAddOrUpdate from "../ImageGripPre"
import { Tag } from "lucide-react"

interface IProps{
    name: string,
    onClose: () => void,
    postIsSelected?: IPost,
    handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void,
    confirmCancel: () => void,
    handleSelectedFiles: () => void,
}

const Edit:React.FC<IProps> = ({
    name, onClose, postIsSelected, handleChangeForm
}) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()} // Chan click trong modal
            className="bg-black border-[var(--color-border-soft)] border-1 rounded-2xl p-2 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
        >
            <div className="flex flex-row">
                <button
                    onClick={onClose}
                    type="button"
                    className="w-7 h-7 hover:bg-gray-700 rounded-full hover:cursor-pointer mt-1 mr-2"
                >
                    <IconLucide name="X" className="ml-1 w-5 h-5" />
                </button>
                <h1 className="self-center text-xl font-semibold flex-1">Edit post</h1>
                <button
                    type="button"
                    className="px-6 py-1 bg-white rounded-full hover:cursor-pointer hover:bg-[var(--color-text-secondary)]"
                >
                    <span className="text-black font-semibold text-md self-center">Save</span>
                </button>
            </div>
            {/* Phan title */}
            <div className="mt-2">
                <TextArea
                    name={name}
                    value={postIsSelected?.title || ""}
                    label="Tiêu đề bài viết :"
                    isEdit={true}
                    lengthInput={postIsSelected?.title?.trim().length || 0}
                    onChange={handleChangeForm}
                />
            </div>
            {/* Phan anh */}
            {postIsSelected?.images ? (
                <ImageGridAddOrUpdate
                    images={postIsSelected.images}
                    onRemove={(index) => {
                        setPostIsSelected(prev => ({
                            ...prev,
                            images: prev?.images?.filter((_, i) => i !== index) as (string[] | File[])
                        }))
                        setImgPrevire(prev => prev.filter((_, index) => index !== index))
                    }}
                />
            ) : (
                <div className="mt-4 mb-4">
                    <h2 className="text-center text-md">Bài viết này không có ảnh! Hãy thêm ảnh cho bài viết này.</h2>
                </div>
            )}
            <div className="flex flex-row">
                <div className="flex-1">
                    <Tag onFileSelect={handleSelectedFiles} />
                </div>
                <button
                    onClick={confirmCancel}
                    className="flex flex-row bg-red-600 px-5 py-1 mt-2 rounded-full hover:bg-red-400 hover:cursor-pointer"
                >
                    <span className="self-center text-md font-semibold">Cancel</span>
                </button>
            </div>
        </div>
    )
}

export default Edit