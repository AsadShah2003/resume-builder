import { useResumeStore } from "@/lib/store/useResumeStore";
import React from "react";

const Languages = ({ language }: { language: string }) => {
  const { resumeFontSize } = useResumeStore();

  return (
    <li
      className={`${
        resumeFontSize === 1
          ? "text-[7px]"
          : resumeFontSize === 2
          ? "text-[8px]"
          : resumeFontSize === 3
          ? "text-[9px]"
          : ""
      } max-w-[350px] break-words`}
    >
      {language}
    </li>
  );
};

export default Languages;
