"use client";

import { useGlobalContext } from "@/app/Context/store";
import { inter, lora, roboto } from "@/styles/fonts";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import FontsSlider from "./SubComponents/FontsSlider";
import ResumeColors from "./ResumeColors";
import { templateImages } from "@/utils/TemplateImages";

interface ResumeTemplateCardProps {
  title: string;
  id: number;
  img: string;
}

export const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({
  id,
  img,
}) => {
  const { setActiveTemplate, activeTemplate } = useGlobalContext();

  const handleTemplateSelection = () => {
    setActiveTemplate(`template${id}`);
  };

  return (
    <>
      <div
        onClick={handleTemplateSelection}
        className="relative h-[350px] w-fit border border-gray-300 shadow-md rounded-md flex  px-1 cursor-pointer hover:border-orange-500 ease-in-out duration-200"
      >
        <div className="w-[200px] h-[300px] rounded-md">
          <img
            src={img}
            alt=""
            className="object-contain rounded-md h-full w-full"
          />
        </div>

        {`template${id}` === activeTemplate && (
          <span
            className={
              lora.className +
              " text-white absolute bottom-2.5 text-[.8rem] px-5 py-1.5 left-16 bg-orange-600 rounded-md"
            }
          >
            Current
          </span>
        )}
      </div>
    </>
  );
};

const ResumeSettings = () => {
  const { setResumeFontSize, resumeFontSize, activeTemplate } =
    useGlobalContext();
  const sliderRef = useRef<any>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 350;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 350;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!touchStartX.current || !touchStartY.current) return;

    const deltaX = touchStartX.current - e.touches[0].clientX;
    const deltaY = touchStartY.current - e.touches[0].clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      requestAnimationFrame(() => {
        sliderRef.current.style.transform = `translateX(${-deltaX}px)`;
      });
    }

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    sliderRef.current.style.transform = "";
  };

  return (
    <div className="xs:ml-[5.4rem] p-4 w-full h-full">
      <h1 className={roboto.className + " text-2xl mt-2 font-bold"}>
        Settings
      </h1>
      <p className="text-gray-700 mt-2 text-[.8rem]">
        Choose any template of your choice
      </p>
      {/* TEMPLATE SELECTOR */}
      <div className="relative flex items-center mt-10 w-[100%]">
        <div className="rounded-full relative right-2">
          <button
            onClick={slideLeft}
            className="rounded-full w-10 h-10 hover:opacity-[0.8] bg-orange-500"
          >
            <MdChevronLeft className="cursor-pointer" size={40} color="white" />
          </button>
        </div>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          ref={sliderRef}
          className="w-[80%] md:w-[80%] lg:w-[74%] h-full flex gap-2 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {templateImages.map((item) => (
            <ResumeTemplateCard
              img={item.imgPath}
              key={item.id}
              id={item.id}
              title={item.title}
            />
          ))}
        </div>
        <button
          onClick={slideRight}
          className="rounded-full w-10 hover:opacity-[0.8] h-10 bg-orange-500 z-[10]"
        >
          <MdChevronRight className="cursor-pointer" size={40} color="white" />
        </button>
      </div>
      {/* FOR CERTAIN RESUME SHOW COLOR SELECTOR */}
      {activeTemplate === "template6" ||
        activeTemplate === "template7" ||
        (activeTemplate === "template8" ? null : (
          <div>
            <ResumeColors />
          </div>
        ))}

      {/* FONT SIZE SELECTOR */}
      <div className="mt-5 max-w-[400px] flex flex-col gap-4">
        <div>
          <h1 className={roboto.className + " text-2xl mt-2 font-bold"}>
            Font Size
          </h1>
          <p className="text-gray-700 mt-2 text-[.8rem]">Choose a font size</p>
        </div>
        <div className="flex items-center gap-2  text-[.8rem]">
          <span className={inter.className + " text-gray-700 font-medium"}>
            Default Font Size:
          </span>
          <span className="text-orange-600 font-semibold">
            {resumeFontSize === 1
              ? "Small"
              : resumeFontSize === 2
              ? "Medium"
              : "Large"}
          </span>
        </div>
        <FontsSlider
          max={3}
          min={1}
          step={1}
          onChange={(value) => setResumeFontSize(value)}
        />
      </div>
    </div>
  );
};

export default ResumeSettings;
