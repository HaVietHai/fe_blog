import React, { useRef } from "react";
import { motion } from "framer-motion";
import { IconLucide } from "../IconLucide";

interface IProps {
  viewFooter: number;
  countComment?: number;
  countLiked?: number | 0;
  isLiked?: boolean;
  onLiked?: () => void;
  onChat?: () => void;
  onShare?: () => void;
  onRepost?: () => void;
  onSave?: () => void;
  isComment?: boolean;
}

const Footer: React.FC<IProps> = ({
  viewFooter,
  countComment,
  countLiked,
  isLiked,
  onLiked,
  onChat,
  onShare,
  onRepost,
  onSave,
  isComment,
}) => {
  const heartRef = useRef<HTMLDivElement>(null);

  // Tạo hiệu ứng pháo hoa khi nhấn Like
  const createParticles = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.className = "absolute bg-red-500 rounded-full pointer-events-none";
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${rect.width / 2 - size / 2}px`;
      particle.style.top = `${rect.height / 2 - size / 2}px`;
      particle.style.opacity = "0.9";
      particle.style.transition = "transform 0.8s ease, opacity 0.8s ease";
      element.appendChild(particle);

      const xMove = (Math.random() - 0.5) * 150;
      const yMove = (Math.random() - 0.5) * 150;
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${xMove}px, ${yMove}px) scale(0)`;
        particle.style.opacity = "0";
      });
      setTimeout(() => particle.remove(), 800);
    }
  };

  const handleLike = () => {
    if (heartRef.current) createParticles(heartRef.current);
    onLiked?.();
  };

  return (
    <>
      {viewFooter === 1 && (
        <div className="flex flex-row justify-between ml-16 mt-3 relative">
          <div
            onClick={onChat}
            className="order-1 flex flex-row hover:text-cyan-500"
            title="Reply"
          >
            <IconLucide
              name="MessageCircle"
              className="w-5 h-5 hover:cursor-pointer transition-all duration-300"
            />
            <span className="text-sm ml-1">{countComment}</span>
          </div>

          <div
            ref={heartRef}
            title="Like"
            onClick={handleLike}
            className="relative flex items-center justify-center order-2 w-fit hover:cursor-pointer select-none"
          >
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative flex items-center justify-center"
            >
              <IconLucide
                name="Heart"
                className={`w-5 h-5 transition-all duration-200 ${
                  isLiked
                    ? "text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                    : "hover:text-red-500"
                }`}
              />
            </motion.div>
            <span
              className={`text-sm ml-1 ${
                isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"
              }`}
            >
              {countLiked}
            </span>
          </div>

          {!isComment && (
            <div onClick={onRepost} className="order-3" title="Repost">
              <IconLucide
                name="Shuffle"
                className="w-5 h-5 transition-all duration-300 hover:text-green-500 hover:cursor-pointer"
              />
            </div>
          )}

          {!isComment && (
            <div className="flex flex-row order-4 space-x-2">
              <div onClick={onSave} title="Save">
                <IconLucide
                  name="Bookmark"
                  className="w-5 h-5 hover:text-cyan-500 hover:cursor-pointer"
                />
              </div>
              <div onClick={onShare} title="Share">
                <IconLucide
                  name="Share"
                  className="w-5 h-5 hover:text-cyan-500 hover:cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Footer;
