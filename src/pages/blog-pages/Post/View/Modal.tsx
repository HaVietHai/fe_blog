import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import type { IPost } from "../../../../types/post.type";
import { IconLucide } from "../../../../components/IconLucide";
import TextArea from "../../../../components/Forms/TextArea";
import Tag from "../../../../components/Forms/Tag";
import errorHandler from "../../../../utils/errorHandle";
import {
  handleCreatePost,
  handleGetPostById,
  updatePostAct,
} from "../../../../services/post.service";
import ImageGridAddOrUpdate from "../../../../components/ImageGripPre";
import OverlayLoading from "../../../../components/OverlayLoading";
import { showNotification } from "../../../../utils/helper";

interface IProps {
  postId?: string; // ✅ Nếu có thì là edit, không có thì là post mới
  onClose: () => void;
  onReload: () => void;
  name: string;
  authorId: string; // ✅ Cần cho post mới
}

const ModalPost: React.FC<IProps> = ({
  postId,
  onClose,
  name,
  onReload,
  authorId,
}) => {
  const isEdit = Boolean(postId);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    title: "",
    images: [],
    authorId: authorId as any,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // ✅ Khi có id => load post cũ
  const handleGetPost = async (id: string) => {
    if (!id) return;
    try {
      setIsLoading(true);
      const res = await handleGetPostById(id);
      setPost(res);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Reset hoặc load dữ liệu khi postId thay đổi
  useEffect(() => {
    if (postId) {
      handleGetPost(postId);
    } else {
      // Reset về form rỗng khi tạo mới
      setPost({
        title: "",
        images: [],
        authorId: authorId as any,
      });
    }
  }, [postId, authorId]);

  // ✅ Thay đổi nội dung form
  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Chọn thêm ảnh mới
  const handleSelectedFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setPost((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newFiles],
    }));
  };

  // ✅ Xóa ảnh theo index
  const handleRemoveImage = (index: number) => {
    setPost((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

  // ✅ Submit (update hoặc create)
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("title", post.title || " ");
      formData.append("authorId", authorId);

      // Giữ nguyên ảnh cũ + thêm ảnh mới
      (post.images || []).forEach((item) => {
        if (item instanceof File) {
          formData.append("images", item); // ảnh mới
        } else if (typeof item === "string") {
          formData.append("existingImages", item); // ảnh cũ
        }
      });

      // Debug kiểm tra dữ liệu gửi
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // ✅ Check an toàn để tránh nhầm mode
      if (isEdit && postId) {
        await updatePostAct(postId, formData);
        showNotification({
          type: "success",
          message: "Đã cập nhật bài viết!",
          duration: 3000,
        });
      } else {
        await handleCreatePost(formData);
        showNotification({
          type: "success",
          message: "Đã tạo bài viết mới!",
          duration: 3000,
        });
      }

      onReload();
      onClose();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Hủy modal
  const confirmCancel = () => {
    if (
      confirm(
        isEdit
          ? "Bạn có chắc muốn hủy chỉnh sửa?"
          : "Bạn có chắc muốn hủy tạo bài viết?"
      )
    ) {
      onClose();
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/10 backdrop-brightness-80">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black border-[var(--color-border-soft)] border-1 rounded-2xl p-2 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-row">
          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 hover:bg-gray-700 rounded-full hover:cursor-pointer mt-1 mr-2"
          >
            <IconLucide name="X" className="ml-1 w-5 h-5" />
          </button>
          <h1 className="self-center text-xl font-semibold flex-1">
            {isEdit ? "Edit Post" : "Create Post"}
          </h1>
          <button
            onClick={handleSave}
            type="button"
            className="px-6 py-1 bg-white flex flex-row mx-1 my-1 rounded-full hover:cursor-pointer hover:bg-[var(--color-text-secondary)]"
          >
            <OverlayLoading show={isSaving} />
            <span className="text-black font-semibold text-md self-center">
              {postId ? "Save" : "Post"}
            </span>
          </button>
        </div>

        {/* Title */}
        <div className="mt-2">
          <TextArea
            name={name}
            value={post.title || ""}
            label="Tiêu đề bài viết:"
            isEdit={true}
            lengthInput={post.title?.trim().length || 0}
            onChange={handleChangeForm}
          />
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 ? (
          <ImageGridAddOrUpdate
            images={post.images}
            onRemove={handleRemoveImage}
          />
        ) : (
          <div className="mt-4 mb-4">
            <h2 className="text-center text-md">
              Chưa có ảnh. Hãy thêm ảnh cho bài viết này!
            </h2>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex flex-row my-1">
          <div className="flex-1">
            <Tag onFileSelect={handleSelectedFiles} />
          </div>
          <button
            onClick={confirmCancel}
            className="flex flex-row bg-red-600 mx-1 px-5 py-1 mt-2 rounded-full hover:bg-red-400 hover:cursor-pointer"
          >
            <span className="self-center text-md font-semibold">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalPost;
