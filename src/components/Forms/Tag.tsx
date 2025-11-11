import React, { useRef } from "react";
import { motion } from "framer-motion";
import { IconLucide } from "../IconLucide";

interface Props {
  onFileSelect?: (files: FileList | null) => void;
  onGIF?: () => void;
  onEmoji?: () => void;
  onHastag?: () => void;
}

const Tag: React.FC<Props> = ({
  onFileSelect,
  onEmoji,
  onGIF,
  onHastag,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onFileSelect) onFileSelect(event.target.files);
    event.target.value = "";
  };

  const createParticles = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.className = "absolute bg-cyan-400 rounded-full pointer-events-none";
      const size = Math.random() * 6 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${e.clientX - rect.left - size / 2}px`;
      particle.style.top = `${e.clientY - rect.top - size / 2}px`;
      particle.style.opacity = "0.9";
      particle.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      button.appendChild(particle);

      const xMove = (Math.random() - 0.5) * 60;
      const yMove = (Math.random() - 0.5) * 60;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${xMove}px, ${yMove}px) scale(0)`;
        particle.style.opacity = "0";
      });

      setTimeout(() => particle.remove(), 600);
    }
  };

  const icons = [
    { name: "Image", title: "Media", onClick: handleMediaClick },
    { name: "SquareSigma", title: "GIF", onClick: onGIF },
    { name: "Smile", title: "Emoji", onClick: onEmoji },
    { name: "Hash", title: "Hashtag", onClick: onHastag },
  ];

  return (
    <div className="flex flex-row mt-1 relative">
      {icons.map((icon, index) => (
        <motion.button
          key={index}
          title={icon.title}
          type="button"
          onClick={(e) => {
            createParticles(e);
            icon.onClick?.();
          }}
          whileHover={{
            scale: 1.2,
            boxShadow: "0 0 10px rgba(34,211,238,0.6)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:cursor-pointer"
        >
          <IconLucide
            name={icon.name}
            className="w-5 h-5 text-[var(--color-brand-cyan)]"
          />
        </motion.button>
      ))}

      {/* hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};

export default Tag;
