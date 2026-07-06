"use client";

import React, { useState } from "react";
import { typeEducation } from "@/lib/types/editor";

interface EducationChckboxProps {
  labelText: string;
  isStudying: boolean | null | undefined;
  setUserEducation: React.Dispatch<React.SetStateAction<typeEducation>>;
}

const EducationCheckbox: React.FC<EducationChckboxProps> = ({
  labelText,
  setUserEducation,
  isStudying,
}) => {
  const [isChecked, setIsChecked] = useState(!!isStudying);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    setUserEducation((old) => ({
      ...old,
      isStillStudying: isChecked ? true : false,
    }));
  };

  return (
    <div className="mt-5 ml-1 w-full flex gap-2 items-center">
      <input
        onChange={handleCheckboxChange}
        className="accent-orange-600 w-5 rounded-md h-4"
        type="checkbox"
        checked={isChecked}
      />
      <span>{labelText}</span>
    </div>
  );
};

export default EducationCheckbox;
