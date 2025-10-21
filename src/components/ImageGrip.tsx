import React from 'react';

type PostImageGridProps = {
  images: string[]; // Mảng chứa các URL của ảnh
};

// Component con để hiển thị ảnh, giúp tái sử dụng code
const ImageItem = ({ src }: { src: string }) => (
  <img
    src={src}
    alt="post content"
    className="w-full h-full object-cover rounded-md"
  />
);

// Component con cho ảnh cuối cùng có overlay
const LastImageItem = ({ src, count }: { src: string; count: number }) => (
  <div className="relative w-full h-full">
    <img
      src={src}
      alt="post content"
      className="w-full h-full object-cover rounded-md"
    />
    {count > 0 && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-md">
        <span className="text-white text-3xl font-bold">+{count}</span>
      </div>
    )}
  </div>
);

const ImageGrid: React.FC<PostImageGridProps> = ({ images }) => {
  const count = images.length;

  if (count === 0) {
    return null; // Không có ảnh thì không render gì cả
  }

  // --- 1 Ảnh ---
  if (count === 1) {
    return (
      <div className="mt-2 w-full aspect-video">
        <ImageItem src={images[0]} />
      </div>
    );
  }

  // --- 2 Ảnh ---
  if (count === 2) {
    return (
      <div className="mt-2 w-full grid grid-cols-2 gap-1 aspect-video">
        <ImageItem src={images[0]} />
        <ImageItem src={images[1]} />
      </div>
    );
  }

  // --- 3 Ảnh ---
  if (count === 3) {
    return (
      <div className="mt-2 w-full grid grid-cols-2 grid-rows-2 gap-1 aspect-video">
        {/* Ảnh 1 bên trái, chiếm 2 hàng */}
        <div className="row-span-2">
          <ImageItem src={images[0]} />
        </div>
        {/* 2 Ảnh nhỏ bên phải */}
        <ImageItem src={images[1]} />
        <ImageItem src={images[2]} />
      </div>
    );
  }

  // --- 4 Ảnh ---
  if (count === 4) {
    return (
      <div className="mt-2 w-full grid grid-cols-2 grid-rows-2 gap-1 aspect-video">
        <ImageItem src={images[0]} />
        <ImageItem src={images[1]} />
        <ImageItem src={images[2]} />
        <ImageItem src={images[3]} />
      </div>
    );
  }

  // --- 5 Ảnh hoặc nhiều hơn ---
  // Hiển thị 5 ảnh (2 trên, 3 dưới), ảnh thứ 5 có overlay
  if (count >= 5) {
    const imagesToShow = images.slice(0, 5);
    const hiddenCount = images.length - 5; // Số ảnh bị ẩn

    return (
      <div className="mt-2 w-full flex flex-col gap-1 aspect-video">
        {/* 2 ảnh hàng trên */}
        <div className="grid grid-cols-2 gap-1 flex-1">
          <ImageItem src={imagesToShow[0]} />
          <ImageItem src={imagesToShow[1]} />
        </div>
        {/* 3 ảnh hàng dưới */}
        <div className="grid grid-cols-3 gap-1 flex-1">
          <ImageItem src={imagesToShow[2]} />
          <ImageItem src={imagesToShow[3]} />
          {/* Ảnh thứ 5 (cuối cùng) với overlay */}
          <LastImageItem src={imagesToShow[4]} count={hiddenCount} />
        </div>
      </div>
    );
  }

  return null;
};

export default ImageGrid;