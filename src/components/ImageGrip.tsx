import React from "react";

type PostImageGridProps = {
  images: string[];
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ImageItem = ({ src }: { src: string }) => (
  <img
    src={src}
    alt="post"
    className="w-full h-full object-cover "
  />
);

const LastImageItem = ({ src, count }: { src: string; count: number }) => (
  <div className="relative w-full h-full">
    <img src={src} alt="post" className="w-full h-full object-cover" />
    {count > 0 && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
        <span className="text-white text-2xl font-bold">+{count}</span>
      </div>
    )}
  </div>
);

const ImageGrid: React.FC<PostImageGridProps> = ({ images }) => {
  if (!images?.length) return null;
  const count = images.length;
  const hiddenCount = count - 5;

  // Giới hạn 5 ảnh hiển thị
  const imgs = images.slice(0, 5).map((img) => `${BASE_URL}${img}`);

  // Wrapper để ảnh không quá to (như Facebook)
  const gridBaseClass = "mt-2 w-full rounded-lg overflow-hidden bg-gray-50";

  // Chiều cao ảnh cố định: tỉ lệ 16:9 hoặc gần vuông tuỳ số lượng
  const aspectClass =
    count === 1 ? "aspect-video" : count === 2 ? "aspect-[4/3]" : "aspect-[1/1]";

  return (
    <div className={`${gridBaseClass} ${aspectClass}`}>
      {count === 1 && <ImageItem src={imgs[0]} />}

      {count === 2 && (
        <div className="grid grid-cols-2 gap-1 h-full">
          {imgs.map((src, i) => (
            <ImageItem key={i} src={src} />
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
          <div className="row-span-2">
            <ImageItem src={imgs[0]} />
          </div>
          <ImageItem src={imgs[1]} />
          <ImageItem src={imgs[2]} />
        </div>
      )}

      {count === 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
          {imgs.map((src, i) => (
            <ImageItem key={i} src={src} />
          ))}
        </div>
      )}

      {count >= 5 && (
        <div className="flex flex-col gap-1 h-full">
          <div className="grid grid-cols-2 gap-1 flex-1">
            <ImageItem src={imgs[0]} />
            <ImageItem src={imgs[1]} />
          </div>
          <div className="grid grid-cols-3 gap-1 flex-1">
            <ImageItem src={imgs[2]} />
            <ImageItem src={imgs[3]} />
            <LastImageItem src={imgs[4]} count={hiddenCount} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
