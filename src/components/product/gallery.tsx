import React, { useState } from "react";
import { ImageGalleryProps } from "@/utils/types/product";

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <img
          src={selectedImage}
          alt="Product Image"
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-5">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product Image ${index}`}
            className={`cursor-pointer w-24 h-24 object-cover border ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
