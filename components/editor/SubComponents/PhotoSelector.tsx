"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import fallbackimg from "@/public/fallback.jpg";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/store";
import { IoCloudUploadOutline } from "react-icons/io5";
interface PhotoSelectorProps {
  imgpath?: string;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ imgpath }) => {
  const { setSelectedImage, selectedImage } = useGlobalContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  return (
    <div className="mt-5 flex flex-col gap-1">
      <div className="flex gap-4">
        <div className="w-20 h-20  rounded-full">
          <Image
            priority={true}
            src={selectedImage || imgpath || fallbackimg}
            className="w-full h-full object-cover rounded-full"
            alt="user-photo"
            width={0}
            height={0}
          />
        </div>

        <div className="flex flex-col mt-2 relative">
          <label className="text-[.9rem] font-semibold">Profile Photo</label>
          <button
            className=" hover:bg-orange-400 duration-300  mt-2 font-[500] text-[.8rem] border border-orange-400 rounded-sm py-2 px-5"
            onClick={handleUploadButtonClick}
            onMouseEnter={() => setIsButtonHovered(!isButtonHovered)}
            onMouseLeave={() => setIsButtonHovered(!isButtonHovered)}
          >
            <span
              className={`pl-4 ${
                isButtonHovered ? "text-white" : "text-orange-500"
              }`}
            >
              Upload Photo
            </span>
          </button>
          <IoCloudUploadOutline
            size={19}
            className={`${
              isButtonHovered ? "text-white" : "text-orange-500"
            } absolute left-[7%] bottom-[19%]`}
          />
        </div>
        <input
          ref={fileInputRef}
          onChange={handleImageUpload}
          type="file"
          accept="image/*"
          hidden
          id="photo-selector"
        />
      </div>
    </div>
  );
};

export default PhotoSelector;
