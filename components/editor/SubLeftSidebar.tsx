"use client";
import React from "react";
import { FaListUl } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";
import { useRouter } from "next/navigation";

const leftSidebarOptions = [
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

const SubLeftSidebar = () => {
  const { push } = useRouter();
  const { activeTab, setActiveTab } = useGlobalContext();

  return (
    <>
      <div className="z-[2] w-[76px] hidden xs:flex flex-col pt-7 items-center gap-6 bg-leftsidebar border-r border-gray-300 fixed h-[100vh]">
        <div className="cursor-pointer">
          <IoArrowBack size={21} onClick={() => push("/")} />
        </div>
        <ul className="px-2 pt-4 mx-auto flex flex-col gap-4 max-w-full">
          {leftSidebarOptions.map((option, index) => (
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
      </div>
    </>
  );
};

export default SubLeftSidebar;
