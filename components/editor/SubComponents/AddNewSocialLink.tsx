"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";
import InputField from "./InputField";
import DisplaySocialLinks from "./DisplaySocialLinks";
import { poppins, roboto } from "@/styles/fonts";
import { SanitizeInput } from "@/utils/SanitizeInput";

interface NewSocialLinkProps {
  setShowSkillElement: () => void;
}

const NewSocialLink: React.FC<NewSocialLinkProps> = ({
  setShowSkillElement,
}) => {
  const { socialLinks, setSocialLinks } = useGlobalContext();

  //states for storing the dropdown and social link value
  const [selectedDropdown, setSelectedDropdown] = useState<string>("linkedin");
  const [profileLink, setProfileLink] = useState<string>("");

  //for adding social link to list and hiding the input field
  const handleAdd = () => {
    if (profileLink === "") return;

    //add the details to the context
    setSocialLinks([
      ...socialLinks,
      {
        id: socialLinks.length + 1,
        link: profileLink,
        platform: selectedDropdown,
      },
    ]);

    //hide the input field
    setShowSkillElement();
  };

  //for getting the value from dropdown
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDropdown(event.target.value);
  };

  return (
    <div className="mt-2 flex gap-2 pb-4">
      <div className="flex flex-col">
        <InputField
          labelTitle="Social link"
          onChange={(e) => setProfileLink(SanitizeInput(e.target.value))}
          emptyCheck={true}
          emptyCheckAgainst={profileLink}
          emptyCheckLabel="Social Link is required"
        />
      </div>
      <select
        className="h-[2.94rem] px-[1.15rem] mt-6 border border-slate-300 rounded-sm"
        value={selectedDropdown}
        onChange={handleSelectChange}
      >
        <option value="linkedin">Linked-in</option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="github">Github</option>
        <option value="website">Website</option>
        <option value="youtube">Youtube</option>
      </select>
      <button
        onClick={handleAdd}
        className="h-[2.94rem] mt-6 w-32 bg-orange-600 hover:bg-orange-500 duration-150 text-white rounded-md"
      >
        Add
      </button>
    </div>
  );
};

const AddNewSocialLink: React.FC = () => {
  const { socialLinks, showElements } = useGlobalContext();
  //states to show/hide the new element
  const [showLinkElement, setShowLinkElement] = useState<boolean>(false);
  //other states
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  const handleShowLinkElement = () => {
    setShowLinkElement(!showLinkElement);
  };

  return (
    <>
      {/* WRAPPER FOR SHOWING ALL SOCIAL LINKS*/}
      {socialLinks &&
        socialLinks.map((link, idx) => (
          <DisplaySocialLinks
            key={link.id}
            id={link.id}
            platform={link.platform}
            link={link.link}
          />
        ))}
      <div
        className={`${
          isLinkHovered ? "bg-[#ffe8d6]" : "bg-[#fde5d2]"
        } w-fit  mt-5 py-1.5 px-3 flex gap-3 items-center rounded-lg relative cursor-pointer`}
        onMouseEnter={() => setIsLinkHovered(!isLinkHovered)}
        onClick={handleShowLinkElement}
        onMouseLeave={() => setIsLinkHovered(!isLinkHovered)}
      >
        <button className="max-w-[180px] py-0.5 px-5 rounded-sm">
          <span className="ml-6 text-orange-500 text-[.9rem] font-medium">
            Add Link
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
      {showLinkElement && showElements.allowSocialLinkToShow && (
        <>
          <div className="mt-0 w-full">
            <NewSocialLink setShowSkillElement={handleShowLinkElement} />
          </div>
        </>
      )}
    </>
  );
};

export default AddNewSocialLink;
