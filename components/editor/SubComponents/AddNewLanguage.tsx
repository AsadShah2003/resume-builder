"use client";

import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";
import InputField from "./InputField";
import DisplayLanguage from "./DisplayLanguage";
import { roboto } from "@/styles/fonts";
import { SanitizeInput } from "@/utils/SanitizeInput";

interface NewLanguageProps {
  setShowLanguageElement: () => void;
}

const NewLanguage: React.FC<NewLanguageProps> = ({
  setShowLanguageElement,
}) => {
  const { languages, setLanguages } = useGlobalContext();

  //states for storing the dropdown and social link value
  const [userLanguage, setUserLanguage] = useState<string>("");

  //for adding social link to list and hiding the input field
  const handleAdd = () => {
    if (userLanguage === "") return;
    //add the details to the context
    setLanguages([
      ...languages,
      {
        id: languages.length + 1,
        language: userLanguage,
      },
    ]);

    //hide the input field
    setShowLanguageElement();
  };

  return (
    <div className="mt-2 flex gap-2 pb-4">
      <InputField
        labelTitle="Language"
        onChange={(e) => setUserLanguage(SanitizeInput(e.target.value))}
        emptyCheck={true}
        emptyCheckLabel="Language is required"
        emptyCheckAgainst={userLanguage}
      />

      <button
        onClick={handleAdd}
        className="h-[2.94rem] mt-6 9 w-32 bg-orange-600 hover:bg-orange-500 duration-150 text-white rounded-md"
      >
        Add
      </button>
    </div>
  );
};

const AddNewLanguage: React.FC = () => {
  const { languages, showElements } = useGlobalContext();
  //states to show/hide the new element
  const [showLanguageElement, setShowLanguageElement] =
    useState<boolean>(false);
  //other states
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  const handleShowLanguageElement = () => {
    setShowLanguageElement(!showLanguageElement);
  };

  return (
    <>
      {/* WRAPPER FOR SHOWING ALL SOCIAL LINKS*/}
      {languages &&
        languages.map((lang) => (
          <DisplayLanguage
            key={lang.id}
            id={lang.id}
            language={lang.language}
          />
        ))}
      <div
        className={`${
          isLinkHovered ? "bg-[#ffe8d6]" : "bg-[#fde5d2]"
        } w-fit  mt-5 py-1.5 px-3 flex gap-3 items-center rounded-lg relative cursor-pointer`}
        onMouseEnter={() => setIsLinkHovered(!isLinkHovered)}
        onClick={handleShowLanguageElement}
        onMouseLeave={() => setIsLinkHovered(!isLinkHovered)}
      >
        <button className="max-w-[180px] py-0.5 px-5 rounded-sm">
          <span className="ml-6 text-orange-500 text-[.9rem] font-medium">
            Add Language
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

      {showLanguageElement && showElements.allowLangsToShow && (
        <>
          <div className="mt-0 w-full">
            <NewLanguage setShowLanguageElement={handleShowLanguageElement} />
          </div>
        </>
      )}
    </>
  );
};

export default AddNewLanguage;
