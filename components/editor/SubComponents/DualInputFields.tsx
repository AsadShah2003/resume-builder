import { useGlobalContext } from "@/app/Context/store";
import { inter, poppins } from "@/styles/fonts";
import React, { ChangeEvent } from "react";

interface DualInputFieldsProps {
  firstInputlabelTitle: string;
  firstInputplaceholderText?: string;
  secondInputlabelTitle: string;
  secondInputPlaceholderText?: string;
  firstInputValue?: string;
  secondInputValue?: string;
  onFirstInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSecondInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errorLabelForFirstInput?: string | undefined;
  errorLabelForSecondInput?: String | undefined;
}

const DualInputFields: React.FC<DualInputFieldsProps> = ({
  firstInputlabelTitle,
  firstInputplaceholderText,
  secondInputlabelTitle,
  secondInputPlaceholderText,
  firstInputValue,
  secondInputValue,
  onFirstInputChange,
  onSecondInputChange,
  errorLabelForFirstInput,
  errorLabelForSecondInput,
}) => {
  return (
    <div className="pt-3 flex gap-4">
      <div className="flex flex-col gap-1 flex-[1]">
        <label
          htmlFor={firstInputlabelTitle.toLowerCase()}
          className={`${inter.className} text-[.9rem]`}
        >
          {firstInputlabelTitle}
        </label>
        <div className="border rounded-sm border-gray-300">
          <input
            className={`w-full outline-none p-2.5 border-none ${inter.className}`}
            type="text"
            id={firstInputlabelTitle.toLowerCase()}
            placeholder={
              firstInputplaceholderText === "" ? "" : firstInputplaceholderText
            }
            value={firstInputValue}
            onChange={onFirstInputChange}
          />
        </div>
        {errorLabelForFirstInput && (
          <span
            className={
              poppins.className + " text-red-500 text-xs relative top-2"
            }
          >
            {errorLabelForFirstInput}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 flex-[1]">
        <label
          htmlFor={secondInputlabelTitle.toLowerCase()}
          className="text-[.9rem]"
        >
          {secondInputlabelTitle}
        </label>
        <div className="border rounded-sm border-gray-300">
          <input
            className="w-full outline-none p-2.5 border-none"
            type="text"
            value={secondInputValue}
            id={secondInputlabelTitle.toLowerCase()}
            placeholder={
              secondInputPlaceholderText === ""
                ? ""
                : secondInputPlaceholderText
            }
            onChange={onSecondInputChange}
          />
        </div>
        {errorLabelForSecondInput && (
          <span
            className={
              poppins.className + " text-red-500 text-xs relative top-2"
            }
          >
            {errorLabelForSecondInput}
          </span>
        )}
      </div>
    </div>
  );
};

export default DualInputFields;
