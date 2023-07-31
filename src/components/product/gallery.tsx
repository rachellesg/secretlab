import React, { useState } from "react";
import { ImageGalleryProps } from "@/utils/types/product";

import Image from "next/image";

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="flex w-full">
        <Image
          src={selectedImage}
          alt="Product Image"
          className="w-full h-auto max-w-[500px]"
          width="500"
          height="0"
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-5">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product Image ${index}`}
            className={`cursor-pointer w-20 h-20 object-cover rounded-lg border ${
              selectedImage === image ? "border-gray-300" : "border-gray-300"
            }`}
            width="100"
            height="100"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
