import { useGlobalContext } from "@/app/Context/store";
import React from "react";

const HorizontalDivider = ({ id }: { id: string }) => {
  const { highlightHR } = useGlobalContext();
  return (
    <hr
      className={`mt-3 relative top-1 w-[990px] right-6 lg:w-[1060px] h-[.20rem] ${
        id === highlightHR ? "bg-red-500" : "bg-gray-100"
      }`}
    />
  );
};

export default HorizontalDivider;
