import React, { useState } from "react";

const ImagePreviewPopup = (src) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageClick = (src) => {
    setImageSrc(src);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setImageSrc("");
  };

  return (
    <div className="p-4">
      {/* Popup Overlay */}
      <div  className=" cursor-pointer text-blue-400 underline" onClick={() => handleImageClick(src)} > show payment </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative bg-white p-4 rounded shadow-xl max-w-4xl w-full">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              ×
            </button>
            <img
              src={imageSrc.src}
              alt="Full Preview"
              className="max-h-[80vh] mx-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreviewPopup;
