import { useGlobalContext } from "@/app/Context/store";
import React from "react";

const Skills = ({ skill }: { skill: string }) => {
  const { resumeFontSize } = useGlobalContext();
  return (
    <li
      className={`${
        resumeFontSize === 1
          ? "text-[7px]"
          : resumeFontSize === 2
          ? "text-[8px]"
          : resumeFontSize === 3
          ? "text-[9px]"
          : ""
      } max-w-[210px] break-words`}
    >
      {skill}
    </li>
  );
};

export default Skills;
