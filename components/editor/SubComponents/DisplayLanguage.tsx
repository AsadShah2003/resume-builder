"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useState, ChangeEvent, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { typeLanguage } from "@/lib/types/editor";
import { SanitizeInput } from "@/utils/SanitizeInput";
import { IoCheckmarkOutline } from "react-icons/io5";

interface DisplayLanguageProps {
  id: number;
  language: string;
}

const DisplayLanguage: React.FC<DisplayLanguageProps> = ({ id, language }) => {
  const { languages, setLanguages, setShowElements } = useGlobalContext();
  const [languageUpdatedData, setLanguageUpdatedData] = useState<typeLanguage>({
    id,
    language: "",
  });
  const [isTryingToUpdate, setIsTryingToUpdate] = useState<boolean>(false);

  const handleLanguageDeletion = () => {
    const removeCurrLanguage = languages.filter((lang) => lang.id !== id);
    setLanguages([...removeCurrLanguage]);
    setShowElements((prev) => ({ ...prev, allowLangsToShow: true }));
  };

  const handleLanguageUpdate = () => {
    if (languageUpdatedData.language === "") return;
    const langToUpdate = languages.find((lang) => lang.id === id);
    if (langToUpdate) {
      // Update the language data
      const updatedLang = {
        ...langToUpdate,
        language: languageUpdatedData.language,
      };

      // Find the index of the skill in the skills array
      const langIndex = languages.findIndex((lang) => lang.id === id);

      // Create a new array with the updated skill
      const updatedLangs = [...languages];
      updatedLangs[langIndex] = updatedLang;

      // Set the updated skills array
      setLanguages(updatedLangs);

      // Reset the state variables
      setIsTryingToUpdate(false);
    }
    setShowElements((prev) => ({ ...prev, allowLangsToShow: true }));
  };

  const handleIsTryingtoUpdate = () => {
    setShowElements((prev) => ({ ...prev, allowLangsToShow: false }));
    setIsTryingToUpdate(!isTryingToUpdate);
  };
  useEffect(() => {
    setLanguageUpdatedData((old) => ({ ...old, language: language }));
  }, []);
  return (
    <>
      <div
        className={`mt-5 w-full border flex items-center justify-between border-gray-200 ${
          isTryingToUpdate ? "p-1" : "p-4"
        } rounded-md`}
      >
        {!isTryingToUpdate ? (
          <span className="text-sm max-w-[350px] truncate">{language}</span>
        ) : (
          <input
            type="text"
            className="p-3 outline-none border-none"
            value={languageUpdatedData.language}
            onChange={(e) =>
              setLanguageUpdatedData((old) => ({
                ...old,
                language: SanitizeInput(e.target.value),
              }))
            }
          />
        )}
        <div className="flex gap-5 items-center mr-3">
          <RiDeleteBin6Line
            onClick={handleLanguageDeletion}
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
              onClick={handleLanguageUpdate}
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

export default DisplayLanguage;
