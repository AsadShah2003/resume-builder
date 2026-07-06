import { useResumeStore } from "@/lib/store/useResumeStore";
import React from "react";

const Languages = ({ language }: { language: string }) => {
  const { resumeFontSize } = useResumeStore();

  return (
    <li
      className={`${
        resumeFontSize === 1
          ? "text-[.55rem]"
          : resumeFontSize === 2
          ? "text-[.58rem]"
          : resumeFontSize === 3
          ? "text-[.64rem]"
          : ""
      } max-w-[210px] break-words`}
    >
      {language}
    </li>
  );
};

export default Languages;
