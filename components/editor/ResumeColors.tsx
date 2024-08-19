"use client";

import { useGlobalContext } from "@/app/Context/store";
import { roboto } from "@/styles/fonts";
import { useEffect } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

function ResumeColors() {
  const { activeTemplate, templateColor, setTemplateColor } =
    useGlobalContext();

  useEffect(() => {}, [activeTemplate]);

  const handleColorClick = (color: string) => {
    if (color !== templateColor) {
      setTemplateColor(color);
    }
  };

  return (
    <>
      <h1 className={roboto.className + " text-2xl mt-10 font-bold"}>Colors</h1>
      <p className="text-gray-700 mt-2 text-[.8rem]">
        Customize color for your resume
      </p>
      <div className="mt-4 flex items-center gap-2">
        <div
          onClick={() => handleColorClick("#ba2839")}
          className={`w-10 cursor-pointer h-10 rounded-md bg-[#ba2839] flex items-center justify-center ${
            templateColor === "#ba2839" && "border border-white"
          }`}
        >
          {templateColor === "#ba2839" && (
            <IoCheckmarkOutline size={24} color="white" />
          )}
        </div>
        <div
          onClick={() => handleColorClick("#145349")}
          className={`w-10 cursor-pointer h-10 rounded-md bg-[#145349] flex items-center justify-center ${
            templateColor === "#145349" && "border border-white"
          }`}
        >
          {templateColor === "#145349" && (
            <IoCheckmarkOutline size={24} color="white" />
          )}
        </div>
        <div
          onClick={() => handleColorClick("#4B5563")}
          className={`w-10 cursor-pointer h-10 rounded-md bg-[#4B5563] flex items-center justify-center ${
            templateColor === "#4B5563" && "border border-white"
          }`}
        >
          {templateColor === "#4B5563" && (
            <IoCheckmarkOutline size={24} color="white" />
          )}
        </div>
        <div
          onClick={() => handleColorClick("#1e467e")}
          className={`w-10 cursor-pointer h-10 rounded-md bg-[#1e467e] flex items-center justify-center ${
            templateColor === "#1e467e" && "border border-white"
          }`}
        >
          {templateColor === "#1e467e" && (
            <IoCheckmarkOutline size={24} color="white" />
          )}
        </div>
        <div
          onClick={() => handleColorClick("#28545F")}
          className={`w-10 cursor-pointer h-10 rounded-md bg-[#28545F] flex items-center justify-center ${
            templateColor === "#28545F" && "border border-white"
          }`}
        >
          {templateColor === "#28545F" && (
            <IoCheckmarkOutline size={24} color="white" />
          )}
        </div>
        <div
          onClick={() => handleColorClick("#303745")}
          className={`w-10 cursor-pointer h-10 rounded-md bg-[#303745] flex items-center justify-center ${
            templateColor === "#303745" && "border-2 border-white"
          }`}
        >
          {templateColor === "#303745" && (
            <IoCheckmarkOutline size={24} color="white" />
          )}
        </div>
      </div>
    </>
  );
}

export default ResumeColors;
