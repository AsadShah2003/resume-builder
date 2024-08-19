import { useGlobalContext } from "@/app/Context/store";
import React from "react";

const Languages = ({ language }: { language: string }) => {
  const { resumeFontSize } = useGlobalContext();

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
