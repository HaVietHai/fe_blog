// components/Post/PostMoreMenu.tsx
import React from "react";
import { IconLucide } from "./IconLucide";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const PostMoreMenu: React.FC<Props> = ({ onEdit, onDelete, onClose }) => {
  return (
    <div className="absolute transition-all duration-300 scale-100 overflow-hidden top-140 right-5 bg-gray-800 shadow-xl rounded-2xl border border-[var(--color-border-soft)] w-50 flex flex-col z-99">
      <button
        onClick={onEdit}
        className="
        px-4 py-3 text-left 
        hover:bg-[var(--color-brand-dark)] 
        flex flex-row hover:cursor-pointer
        hover:font-bold
        "
      >
        <IconLucide name="PenLine" className="w-5 h-5 text-gray-400 self-center" />
        <span className="ml-1 text-gray-400">Update post</span>
      </button>
      <button
        onClick={onDelete}
        className="
        px-4 py-3 text-left 
        hover:bg-[var(--color-brand-dark)] 
        flex flex-row hover:cursor-pointer
        hover:font-bold
        "
      >
        <IconLucide name="Trash" className="w-5 h-5 text-gray-400 self-center"/>
        <span className="ml-1 text-gray-400">Remove post</span>
      </button>
      <button
        onClick={onClose}
        className="
        px-4 py-3 text-left 
        hover:bg-[var(--color-brand-dark)] 
        flex flex-row hover:cursor-pointer
        hover:font-bold
        "
      >
        <IconLucide name="CircleX" className="w-5 h-5 text-gray-400 self-center"/>
        <span className="ml-1 text-gray-400">Cancel</span>
      </button>
    </div>
  );
};

export default PostMoreMenu;
