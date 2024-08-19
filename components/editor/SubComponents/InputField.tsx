"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { inter, poppins } from "@/styles/fonts";

interface InputFieldsProps {
  labelTitle?: string;
  placeholderText?: string;
  InputValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  emptyCheck?: boolean;
  emptyCheckAgainst?: any;
  emptyCheckLabel?: string;
}

const InputField: React.FC<InputFieldsProps> = ({
  labelTitle,
  placeholderText,
  InputValue,
  onChange,
  emptyCheck,
  emptyCheckAgainst,
  emptyCheckLabel,
}) => {
  const [startedTyping, setStartedTyping] = useState<boolean>(false);
  useEffect(() => {
    if (emptyCheckAgainst?.length > 0) {
      setStartedTyping(true);
    }
  }, [emptyCheckAgainst]);

  return (
    <div className="flex flex-col gap-1">
      {labelTitle === undefined ? null : (
        <label htmlFor="fname" className={`${inter.className} text-[.9rem]`}>
          {labelTitle}
        </label>
      )}
      <div>
        <div className="border rounded-sm border-gray-300">
          <input
            className={`w-full outline-none p-2.5 border-none ${inter.className}`}
            type="text"
            id="fname"
            placeholder={placeholderText === "" ? "" : placeholderText}
            onChange={onChange}
            value={InputValue}
          />
        </div>
        {emptyCheck && emptyCheckAgainst === "" && startedTyping && (
          <span
            className={
              poppins.className + " text-red-500 text-xs relative top-2"
            }
          >
            {emptyCheckLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
