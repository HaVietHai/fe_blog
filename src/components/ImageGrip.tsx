import React, { useState } from "react";
import { IconLucide } from "./IconLucide";

type PostImageGridProps = {
  images: string[];
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ImageItem = ({
  src,
  onClick,
}: {
  src: string;
  onClick?: () => void;
}) => (
  <img
    src={src}
    alt="post"
    onClick={onClick}
    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
  />
);

const LastImageItem = ({
  src,
  count,
  onClick,
}: {
  src: string;
  count: number;
  onClick?: () => void;
}) => (
  <div className="relative w-full h-full">
    <img
      src={src}
      alt="post"
      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
      onClick={onClick}
    />
    {count > 0 && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
        <span className="text-white text-2xl font-bold">+{count}</span>
      </div>
    )}
  </div>
);

const ImageGrid: React.FC<PostImageGridProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images?.length) return null;
  const count = images.length;
  const hiddenCount = count - 5;
  const imgs = images.map((img) =>
    img.startsWith("http") ? img : `${BASE_URL}${img}`
  );

  const gridBaseClass = "mt-2 w-full rounded-lg overflow-hidden bg-gray-50";
  const aspectClass =
    count === 1 ? "aspect-video" : count === 2 ? "aspect-[4/3]" : "aspect-[1/1]";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! > 0 ? prev! - 1 : imgs.length - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! < imgs.length - 1 ? prev! + 1 : 0
    );
  };

  const handleClose = () => setSelectedIndex(null);

  return (
    <>
      {/* Lưới ảnh */}
      <div className={`${gridBaseClass} ${aspectClass}`}>
        {count === 1 && <ImageItem src={imgs[0]} onClick={() => setSelectedIndex(0)} />}

        {count === 2 && (
          <div className="grid grid-cols-2 gap-1 h-full">
            {imgs.map((src, i) => (
              <ImageItem key={i} src={src} onClick={() => setSelectedIndex(i)} />
            ))}
          </div>
        )}

        {count === 3 && (
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
            <div className="row-span-2">
              <ImageItem src={imgs[0]} onClick={() => setSelectedIndex(0)} />
            </div>
            <ImageItem src={imgs[1]} onClick={() => setSelectedIndex(1)} />
            <ImageItem src={imgs[2]} onClick={() => setSelectedIndex(2)} />
          </div>
        )}

        {count === 4 && (
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
            {imgs.map((src, i) => (
              <ImageItem key={i} src={src} onClick={() => setSelectedIndex(i)} />
            ))}
          </div>
        )}

        {count >= 5 && (
          <div className="flex flex-col gap-1 h-full">
            <div className="grid grid-cols-2 gap-1 flex-1">
              <ImageItem src={imgs[0]} onClick={() => setSelectedIndex(0)} />
              <ImageItem src={imgs[1]} onClick={() => setSelectedIndex(1)} />
            </div>
            <div className="grid grid-cols-3 gap-1 flex-1">
              <ImageItem src={imgs[2]} onClick={() => setSelectedIndex(2)} />
              <ImageItem src={imgs[3]} onClick={() => setSelectedIndex(3)} />
              <LastImageItem
                src={imgs[4]}
                count={hiddenCount}
                onClick={() => setSelectedIndex(4)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal xem ảnh */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="relative w-[70vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imgs[selectedIndex]}
              alt="preview"
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-lg"
            />

            {/* Nút chuyển trái */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 right-300 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-gray-600 transition"
            >
              <IconLucide name="ArrowBigLeft" className="hover:cursor-pointer w-10 h-10"/>
            </button>

            {/* Nút chuyển phải */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 left-300 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-gray-600 transition"
            >
              <IconLucide name="ArrowBigRight" className="hover:cursor-pointer w-10 h-10"/>
            </button>

            {/* Nút đóng */}
            <button
              onClick={handleClose}
              className="absolute bottom-150 hover:cursor-pointer left-305 text-white text-2xl bg-black/50 rounded-full px-2 py-2 hover:bg-gray-400 transition"
            >
              <IconLucide name="X" className="w-7 h-7"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
