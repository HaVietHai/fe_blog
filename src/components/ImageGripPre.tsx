import React, { useState, useEffect } from "react";
import { IconLucide } from "./IconLucide";

interface ImageGridProps {
  images: (string | File)[];
  onRemove: (index: number) => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL?.replace(/\/$/, ""); // loại bỏ dấu "/" ở cuối nếu có

const ImageGridAddOrUpdate: React.FC<ImageGridProps> = ({ images, onRemove }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const urls = images.map((img) => {
      // ✅ Nếu là File, tạo URL blob
      if (img instanceof File) {
        return URL.createObjectURL(img);
      }

      // ✅ Nếu là string
      if (typeof img === "string") {
        // Là blob URL thật
        if (img.startsWith("blob:")) return img;

        // Là full URL
        if (img.startsWith("http://") || img.startsWith("https://")) return img;

        // Là đường dẫn tương đối từ server
        return `${BASE_URL.replace(/\/$/, "")}/${img.replace(/^\/+/, "")}`;
      }

      return ""; // fallback
    });

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [images]);


  const handleNext = () => {
    if (currentIndex + 2 < previewUrls.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const visibleImages = previewUrls.slice(currentIndex, currentIndex + 2);

  return (
    <>
      <div className="relative flex items-center justify-center w-full mt-2">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full"
          >
            <IconLucide name="ChevronLeft" />
          </button>
        )}

        <div className="flex gap-3 overflow-hidden transition-all duration-300 ease-in-out">
          {visibleImages.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setSelectedImage(src)}
              />
              <button
                onClick={() => onRemove(index + currentIndex)}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-600 transition-all"
              >
                <IconLucide name="X" className="text-white w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {currentIndex + 2 < previewUrls.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full"
          >
            <IconLucide name="ChevronRight" />
          </button>
        )}
      </div>

      {/* Xem ảnh full */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-[70%] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-red-600"
            >
              <IconLucide name="X" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGridAddOrUpdate;
