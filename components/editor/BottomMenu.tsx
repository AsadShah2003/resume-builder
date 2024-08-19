"use client";
import React from "react";
import { FaListUl } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";

const bottomMenuOptions = [
  {
    optionTitle: "Editor",
    optionIcon: <FaListUl size={18} />,
  },
  {
    optionTitle: "Settings",
    optionIcon: <IoSettingsOutline size={18} />,
  },
  {
    optionTitle: "Preview",
    optionIcon: <MdOutlineLiveTv size={18} />,
  },
];

const BottomMenu = () => {
  const { activeTab, setActiveTab } = useGlobalContext();
  return (
    <main className="z-[5] bg-white w-full h-fit py-2 border-t  border-gray-300 fixed xs:hidden bottom-0 left-0 flex justify-center items-center">
      <ul className="px-2 pt-4 mx-auto flex gap-20 max-w-full">
        {bottomMenuOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(option.optionTitle)}
            className={`${
              option.optionTitle === "Preview" ? "bl:hidden" : "block"
            } cursor-pointer flex items-center flex-col-reverse gap-2 ${
              activeTab === option.optionTitle
                ? "text-orange-500 transition-all duration-300"
                : ""
            }`}
          >
            <span className={`text-[.7rem] font-medium`}>
              {option.optionTitle}
            </span>
            <span
              className={
                activeTab === option.optionTitle
                  ? "text-orange-500 transition-all duration-300"
                  : ""
              }
            >
              {option.optionIcon}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BottomMenu;
