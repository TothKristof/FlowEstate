import React from "react";

interface PictureModalProps {
  open: boolean;
  onClose: () => void;
  images: string[] | null;
  selectedImage: string | undefined;
  setSelectedImage: (img: string) => void;
}

function PictureModal({ open, onClose, images, selectedImage, setSelectedImage }: PictureModalProps) {
  if (!open || !images || images.length === 0) return null;
  const currentIdx = images.findIndex((img) => img === selectedImage);
  const prevImage = () => {
    if (images.length < 2) return;
    setSelectedImage(images[(currentIdx - 1 + images.length) % images.length]);
  };
  const nextImage = () => {
    if (images.length < 2) return;
    setSelectedImage(images[(currentIdx + 1) % images.length]);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white flex flex-col items-center m-auto relative shadow-2xl rounded-2xl p-6 w-full max-w-3/4">
        <form method="dialog">
          <button type="button" onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex items-center gap-4">
          <button className="btn" onClick={prevImage}>&lt;</button>
          <img src={selectedImage} alt="Property" className="max-h-[60vh] max-w-[60vw] rounded-lg" />
          <button className="btn" onClick={nextImage}>&gt;</button>
        </div>
        <div className="flex gap-2 mt-4">
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt="thumb"
              className={`h-12 w-16 object-cover rounded cursor-pointer border-2 ${img === selectedImage ? "border-emerald-500" : "border-transparent"}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PictureModal;
