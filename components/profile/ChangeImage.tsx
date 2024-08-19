import React from "react";
import Image from "next/image";
import fallback from "@/public/fallback.jpg";
import { lora } from "@/styles/fonts";

const ChangeImage = () => {
  return (
    <div className="w-full flex gap-4 mt-2">
      <Image alt="profile-image" src={fallback} width={100} height={0} />
      <div className="mt-5 flex flex-col">
        <h1 className={lora.className + " text-[.8rem]"}>
          Add a Profile Picture
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <label
            htmlFor="profile-pic-selector"
            className={
              lora.className +
              " text-[.75rem] cursor-pointer text-blue-500 font-semibold"
            }
          >
            Choose a Photo
          </label>
          <input
            type="file"
            accept="image/*"
            hidden
            id="profile-pic-selector"
          />
          <span
            className={
              lora.className +
              " text-[.75rem] cursor-pointer font-semibold text-gray-600"
            }
          >
            Remove Photo
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChangeImage;
