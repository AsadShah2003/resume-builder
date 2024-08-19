"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useState, ChangeEvent, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

import InputField from "./InputField";
import { typeSkills } from "@/lib/types/editor";
import { SanitizeInput } from "@/utils/SanitizeInput";
import { IoCheckmarkOutline } from "react-icons/io5";

interface DisplaySkillProps {
  id: number;
  skill: string;
}

const DisplaySkill: React.FC<DisplaySkillProps> = ({ id, skill }) => {
  const [selectedDropdown, setSelectedDropdown] = useState<string>("beginner");
  const { setSkills, skills, setShowElements } = useGlobalContext();
  const [skillUpdatedData, setSkillUpdatedData] = useState<typeSkills>({
    title: "",
    id,
  });
  const [isTryingToUpdate, setIsTryingToUpdate] = useState<boolean>(false);

  const handleSkillDeletion = () => {
    const removeCurrSkill = skills.filter((skill) => skill.id !== id);
    setSkills([...removeCurrSkill]);
    setShowElements((prev) => ({ ...prev, allowSkillsToShow: true }));
  };

  const handleSkillUpdate = () => {
    if (skillUpdatedData.title === "") return;
    const skillToUpdate = skills.find((skill) => skill.id === id);
    if (skillToUpdate) {
      // Update the skill data
      const updatedSkill = {
        ...skillToUpdate,
        title: skillUpdatedData.title,
        expertise: selectedDropdown,
      };

      // Find the index of the skill in the skills array
      const skillIndex = skills.findIndex((s) => s.id === id);

      // Create a new array with the updated skill
      const updatedSkills = [...skills];
      updatedSkills[skillIndex] = updatedSkill;

      // Set the updated skills array
      setSkills(updatedSkills);

      // Reset the state variables
      setIsTryingToUpdate(false);
    }

    //reset state
    setShowElements((prev) => ({ ...prev, allowSkillsToShow: true }));
  };

  const handleIsTryingtoUpdate = () => {
    setIsTryingToUpdate(!isTryingToUpdate);
    setShowElements((prev) => ({ ...prev, allowSkillsToShow: false }));
  };

  useEffect(() => {
    setSkillUpdatedData((old) => ({ ...old, title: skill }));
  }, []);

  return (
    <>
      <div
        className={`mt-5 w-full border flex items-center justify-between border-gray-200 ${
          isTryingToUpdate ? "p-1" : "p-4"
        } rounded-md`}
      >
        {!isTryingToUpdate ? (
          <span className="text-sm max-w-[350px] truncate">{skill}</span>
        ) : (
          <>
            <input
              type="text"
              className="p-3 outline-none border-none"
              value={skillUpdatedData.title}
              onChange={(e) =>
                setSkillUpdatedData((old) => ({
                  ...old,
                  title: SanitizeInput(e.target.value),
                }))
              }
            />
          </>
        )}
        <div className="flex gap-5 items-center mr-3">
          <RiDeleteBin6Line
            onClick={handleSkillDeletion}
            className="cursor-pointer hover:text-orange-500"
            size={22}
          />
          {!isTryingToUpdate ? (
            <GoPencil
              onClick={handleIsTryingtoUpdate}
              className="cursor-pointer hover:text-orange-500"
              size={21}
            />
          ) : (
            <IoCheckmarkOutline
              onClick={handleSkillUpdate}
              color="green"
              className="cursor-pointer"
              size={25}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DisplaySkill;
