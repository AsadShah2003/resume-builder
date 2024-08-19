"use client";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/store";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DeleteConfirmation } from "./DeleteConfirmation";

interface ResumeCardProps {
  id: string;
  img: string;
  creationDate: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ id, img, creationDate }) => {
  const {
    setActiveTemplate,
    user,
    setCurrCV,
    setResumeFontSize,
    setEducation,
    setWorkExperiece,
    setCVDeleted,
    setLanguages,
    setSkills,
    setPersonalDetails,
    setSocialLinks,
  } = useGlobalContext();
  const { push } = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleEditClick = async () => {
    const req = await axios.get(`/api/cvs/getCV/${user?.authorID}`);
    const res = req.data.cvs || [];
    const toEdit = res.find((cv: any) => cv.resumeID === id);

    if (toEdit) {
      setActiveTemplate(toEdit.cvData.selectedTemplate);
      setPersonalDetails({
        fname: toEdit.cvData.fname || "",
        lname: toEdit.cvData.lname || "",
        role: toEdit.cvData.role || "",
        address: toEdit.cvData.address || "",
        phone: toEdit.cvData.phone || "",
        email: toEdit.cvData.email || "",
      });
      setEducation(toEdit.cvData.education || []);
      setWorkExperiece(toEdit.cvData.workExperience || []);
      setLanguages(toEdit.cvData.languages || []);
      setSocialLinks(toEdit.cvData.socialLinks || []);
      setSkills(toEdit.cvData.skills || []);
      setActiveTemplate(toEdit.cvData.selectedTemplate);
      setResumeFontSize(toEdit.cvData.resumeFontSize || 1);
      setResumeFontSize(toEdit.cvData.resumeFontSize || 1);

      setCurrCV({
        resumeID: id,
        createdAt: toEdit.cvData.createdAt,
        cvData: {
          selectedTemplate: toEdit.cvData.selectedTemplate,
          selectedFontSize: toEdit.cvData.resumeFontSize,
          fname: toEdit.cvData.fname || "",
          lname: toEdit.cvData.lname || "",
          role: toEdit.cvData.role || "",
          address: toEdit.cvData.address || "",
          phone: toEdit.cvData.phone || "",
          email: toEdit.cvData.email || "",
          education: toEdit.cvData.education || [],
          workExperience: toEdit.cvData.workExperience || [],
          languages: toEdit.cvData.languages || [],
          socialLinks: toEdit.cvData.socialLinks || [],
          skills: toEdit.cvData.skills || [],
        },
      });
    }

    push(`/editor/${id}`);
    hideMenu();
  };

  const handleDeleteClick = async () => {
    await axios.post(`/api/cvs/deleteCV`, {
      authorID: user?.authorID,
      toDeleteID: id,
    });

    setCVDeleted((old) => !old);
    hideMenu();
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        hideMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cursor-pointer relative max-w-[15rem] py-0 px-1 md:max-w-[15rem] md:w-[15rem] h-fit border border-gray-300 shadow-md rounded-md mb-4 md:mb-0">
      <div className="relative h-full">
        <img
          src={img}
          onClick={handleEditClick}
          alt="template-card"
          className="object-contain w-full h-full rounded-t-md"
        />
        <div
          ref={dropdownRef}
          className={`absolute bottom-0 right-0 ${showMenu ? "fadeIn" : ""}`}
        >
          <FaEllipsisVertical
            size={36}
            className="text-gray-500 cursor-pointer w-10 p-2 z-[30]"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="origin-top-right z-[2000] absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleEditClick}
                >
                  Edit
                </div>
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleDeleteClick}
                >
                  Delete
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <span className="absolute right-12 bottom-2">
        <DeleteConfirmation deleteHandler={handleDeleteClick} />
      </span>
      <span className="text-slate-800 font-medium absolute left-0 text-[.76rem] mt-3">
        Created: {creationDate}
      </span>
    </div>
  );
};

export default ResumeCard;
