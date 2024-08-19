import { lora } from "@/styles/fonts";
import React from "react";

const NoResumesToShow = () => {
  return (
    <div className="mt-10 px-3 w-full flex flex-col items-center gap-10">
      <h1 className={lora.className + " text-[1.2rem] font-semibold"}>
        You don&apos;t have any any resumes!
      </h1>
    </div>
  );
};

export default NoResumesToShow;
