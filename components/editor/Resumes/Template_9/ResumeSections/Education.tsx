import { useGlobalContext } from "@/app/Context/store";
import React from "react";

const Education = ({
  eduInstitute,
  eduDegree,
  eduStartDate,
  eduEndDate,
  isStudying,
}: {
  eduInstitute: string;
  eduDegree: string;
  eduStartDate: string;
  eduEndDate: string | undefined;
  isStudying: boolean | null | undefined;
}) => {
  const { resumeFontSize } = useGlobalContext();
  return (
    <div className="mt-2 flex flex-col">
      <div>
        <h1
          className={`${
            resumeFontSize === 1
              ? "text-[7px]"
              : resumeFontSize === 2
              ? "text-[8px]"
              : resumeFontSize === 3
              ? "text-[9px]"
              : ""
          } max-w-[400px] font-bold break-words`}
        >
          {eduInstitute}
        </h1>
        <span
          className={`${
            resumeFontSize === 1
              ? "text-[7px]"
              : resumeFontSize === 2
              ? "text-[8px]"
              : resumeFontSize === 3
              ? "text-[9px]"
              : ""
          } text-gray-500 font-semibold max-w-[400px] break-words`}
        >
          {eduDegree} <br />
          <span
            className={`${
              resumeFontSize === 1
                ? "text-[7px]"
                : resumeFontSize === 2
                ? "text-[8px]"
                : resumeFontSize === 3
                ? "text-[9px]"
                : ""
            } font-medium`}
          >
            {eduStartDate} - {isStudying ? "Current" : eduEndDate}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Education;
