"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useState, ChangeEvent, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import InputField from "./InputField";
import { typeSocialMediaLinks } from "@/lib/types/editor";
import { inter } from "@/styles/fonts";
import { SanitizeInput } from "@/utils/SanitizeInput";
import { IoCheckmarkOutline } from "react-icons/io5";
interface DisplaySocialLinksProps {
  id: number;
  platform: string;
  link: string;
}

const DisplaySocialLinks: React.FC<DisplaySocialLinksProps> = ({
  id,
  link,
}) => {
  const [selectedDropdown, setSelectedDropdown] = useState<string>("linkedin");
  const { socialLinks, setSocialLinks, setShowElements } = useGlobalContext();
  const [socialLinkUpdatedData, setSocialLinkUpdatedData] =
    useState<typeSocialMediaLinks>({
      id,
      link: "",
      platform: "",
    });
  const [isTryingToUpdate, setIsTryingToUpdate] = useState<boolean>(false);

  const handleSocialLinkDeletion = () => {
    const removeCurrLink = socialLinks.filter((link) => link.id !== id);
    setSocialLinks([...removeCurrLink]);
    setShowElements((prev) => ({ ...prev, allowSocialLinkToShow: true }));
  };

  const handleSocialLinkUpdate = () => {
    if (socialLinkUpdatedData.link === "") return;
    const linkToUpdate = socialLinks.find((link) => link.id === id);
    if (linkToUpdate) {
      // Update the skill data
      const updatedSocialLink = {
        ...linkToUpdate,
        link: socialLinkUpdatedData.link,
        platform: selectedDropdown,
      };
      // Find the index of the link in the SocialLinks array
      const skillIndex = socialLinks.findIndex((link) => link.id === id);

      // Create a new array with the updated skill
      const updatedLink = [...socialLinks];
      updatedLink[skillIndex] = updatedSocialLink;

      // Set the updated skills array
      setSocialLinks(updatedLink);

      // Reset the state variables
      setIsTryingToUpdate(false);
    }

    //reset state
    setShowElements((prev) => ({ ...prev, allowSocialLinkToShow: true }));
  };

  const handleIsTryingtoUpdate = () => {
    setShowElements((prev) => ({ ...prev, allowSocialLinkToShow: false }));
    setIsTryingToUpdate(!isTryingToUpdate);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDropdown(event.target.value);
  };

  useEffect(() => {
    setSocialLinkUpdatedData((old) => ({ ...old, link: link }));
  }, []);

  return (
    <>
      <div
        className={`mt-5 w-full flex justify-between border border-gray-200 ${
          isTryingToUpdate ? "p-1" : "p-4"
        } rounded-md`}
      >
        {!isTryingToUpdate ? (
          <span className={`${inter.className} text-sm max-w-[300px] truncate`}>
            {link}
          </span>
        ) : (
          <>
            <input
              type="text"
              className="border-none outline-none"
              onChange={(e) =>
                setSocialLinkUpdatedData((old) => ({
                  ...old,
                  link: SanitizeInput(e.target.value),
                }))
              }
              value={socialLinkUpdatedData.link}
            />
            <select
              className="h-[2.9rem] px-2 border border-slate-300 rounded-sm"
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
          </>
        )}
        <div
          className={`ml-2 ${
            isTryingToUpdate ? "mt-2.5" : ""
          } flex gap-5 h-fit items-center`}
        >
          <RiDeleteBin6Line
            onClick={handleSocialLinkDeletion}
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
              onClick={handleSocialLinkUpdate}
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

export default DisplaySocialLinks;
