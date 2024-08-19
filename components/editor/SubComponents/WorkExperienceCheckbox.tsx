"use client";

import React, { useState } from "react";
import { typeWorkExperience } from "@/lib/types/editor";

interface WorkExperienceCheckboxProps {
  labelText: string;
  isWorking: boolean | undefined | null;
  setUserWorkExp: React.Dispatch<React.SetStateAction<typeWorkExperience>>;
}

const WorkExperienceCheckbox: React.FC<WorkExperienceCheckboxProps> = ({
  labelText,
  setUserWorkExp,
  isWorking,
}) => {
  const [isChecked, setIsChecked] = useState(!!isWorking);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedValue = event.target.checked;
    setIsChecked(newCheckedValue);
    setUserWorkExp((old) => ({
      ...old,
      isStillWorking: newCheckedValue ? true : false,
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

export default WorkExperienceCheckbox;
