import { useGlobalContext } from "@/app/Context/store";
import React, { useState, useEffect } from "react";

interface FontsSliderProps {
  min: number;
  max: number;
  step: number;

  onChange: (value: number) => void;
}

const FontsSlider: React.FC<FontsSliderProps> = ({
  min,
  max,
  step,

  onChange,
}) => {
  const { resumeFontSize, setResumeFontSize } = useGlobalContext();
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setResumeFontSize(value);
  };

  useEffect(() => {
    onChange(resumeFontSize);
  }, [resumeFontSize, onChange]);

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={resumeFontSize}
        onChange={handleSliderChange}
        className="w-full"
      />
    </div>
  );
};

export default FontsSlider;
