"use client";

import { ChangeEvent, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";
import InputField from "./InputField";
import DisplaySkill from "./DisplaySkill";
import { roboto } from "@/styles/fonts";
import { SanitizeInput } from "@/utils/SanitizeInput";

interface NewSkill {
  setShowSkillElement: () => void;
}

const NewSkill: React.FC<NewSkill> = ({ setShowSkillElement }) => {
  const { skills, setSkills } = useGlobalContext();

  //states for storing the dropdown and social link value
  const [skillTitle, SetSkillTitle] = useState<string>("");

  //for adding social link to list and hiding the input field
  const handleAdd = () => {
    if (skillTitle === "") return;
    //add the details to the context
    setSkills([
      ...skills,
      {
        id: skills.length + 1,
        title: skillTitle,
      },
    ]);

    //hide the input field
    setShowSkillElement();
  };

  return (
    <div className="mt-2 flex gap-2 pb-4">
      <InputField
        labelTitle="Social link"
        onChange={(e) => SetSkillTitle(SanitizeInput(e.target.value))}
        emptyCheck={true}
        emptyCheckAgainst={skillTitle}
        emptyCheckLabel="Social Link is required"
      />
      <button
        onClick={handleAdd}
        className="h-[2.94rem] mt-6 w-32 bg-orange-600 hover:bg-orange-500 duration-150 text-white rounded-md"
      >
        Add
      </button>
    </div>
  );
};

const AddNewSkill: React.FC = () => {
  const { skills, showElements } = useGlobalContext();
  //states to show/hide the new element
  const [showSkillElement, setShowSkillElement] = useState<boolean>(false);
  //other states
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  const handleShowSkillElement = () => {
    setShowSkillElement(!showSkillElement);
  };

  return (
    <>
      {/* WRAPPER FOR SHOWING ALL SOCIAL LINKS*/}
      {skills &&
        skills.map((skill) => (
          <DisplaySkill key={skill.id} id={skill.id} skill={skill.title} />
        ))}
      <div
        className={`${
          isLinkHovered ? "bg-[#ffe8d6]" : "bg-[#fde5d2]"
        } w-fit  mt-5 py-1.5 px-3 flex gap-3 items-center rounded-lg relative cursor-pointer`}
        onMouseEnter={() => setIsLinkHovered(!isLinkHovered)}
        onClick={handleShowSkillElement}
        onMouseLeave={() => setIsLinkHovered(!isLinkHovered)}
      >
        <button className="max-w-[180px] py-0.5 px-5 rounded-sm">
          <span className="ml-6 text-orange-500 text-[.9rem] font-medium">
            Add Skill
          </span>
        </button>

        <IoAddOutline
          className={
            roboto.className + " absolute text-orange-500 left-5 top-2"
          }
          size={24}
        />
      </div>
      {/* WRAPPER FOR ADDING SOCIAL LINK*/}
      {showSkillElement && showElements.allowSkillsToShow && (
        <>
          <div className="mt-0 w-full">
            <NewSkill setShowSkillElement={handleShowSkillElement} />
          </div>
        </>
      )}
    </>
  );
};

export default AddNewSkill;
