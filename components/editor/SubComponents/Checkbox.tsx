import { inter } from "@/styles/fonts";
import React from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="mt-4 flex items-center space-x-3 pb-2">
      <input
        type="checkbox"
        id={label}
        className="w-4 h-4 rounded"
        checked={checked}
        onChange={() => onChange?.(!checked)}
      />
      <label
        htmlFor={label}
        className={inter.className + " text-[.8rem] text-gray-500"}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
