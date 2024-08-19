"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { inter, roboto } from "@/styles/fonts";
import Image from "next/image";
import { PDFExport } from "@progress/kendo-react-pdf";
type Resume2Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume2: React.FC<Resume2Props> = ({
  draggableSections,
  setDraggableSections,
  forwardRef,
}) => {
  const {
    personalDetails,
    socialLinks,
    skills,
    languages,
    personalProfile,
    workExperience,
    hideProfileImage,
    education,
    activeTab,
    resumeFontSize,
    templateColor,
    selectedImage,
  } = useGlobalContext();
  const [leftSectionOrder, setLeftSectionOrder] = useState<string[]>([]);
  const [rightSectionOrder, setRightSectionOrder] = useState<string[]>([]);

  const leftSections = ["sociallinks", "skills"];
  const rightSections = [
    "personalprofile",
    "workexperience",
    "education",
    "languages",
  ];

  useEffect(() => {
    const leftOrder = draggableSections.filter((section) =>
      leftSections.includes(section)
    );
    const rightOrder = draggableSections.filter((section) =>
      rightSections.includes(section)
    );

    setLeftSectionOrder(leftOrder);
    setRightSectionOrder(rightOrder);
  }, [draggableSections]);

  const moveSection = (
    dragIndex: number,
    hoverIndex: number,
    isLeft: boolean
  ) => {
    const dragSection = isLeft
      ? leftSectionOrder[dragIndex]
      : rightSectionOrder[dragIndex];
    const updatedOrder = isLeft
      ? [...leftSectionOrder]
      : [...rightSectionOrder];

    updatedOrder.splice(dragIndex, 1);
    updatedOrder.splice(hoverIndex, 0, dragSection);

    if (isLeft) {
      setLeftSectionOrder(updatedOrder);
      setDraggableSections([...updatedOrder, ...rightSectionOrder]);
    } else {
      setRightSectionOrder(updatedOrder);
      setDraggableSections([...leftSectionOrder, ...updatedOrder]);
    }
  };

  const renderSection = (section: string, index: number, isLeft: boolean) => {
    switch (section) {
      case "sociallinks":
        return (
          <div
            key={section}
            className={`${isLeft ? "mt-[1.3rem]" : "mt-2.5"} max-w-full`}
          >
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : resumeFontSize === 3
                    ? "text-[.8rem]"
                    : ""
                }`
              }
            >
              Links
            </h1>
            {socialLinks.map((link) => (
              <SocialLinks
                key={link.id}
                link={link.link}
                logotype={link.platform}
              />
            ))}
          </div>
        );
      case "skills":
        return (
          <div
            key={section}
            className={`${isLeft ? "mt-[1.3rem]" : "mt-2.5"} max-w-full`}
          >
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : resumeFontSize === 3
                    ? "text-[.8rem]"
                    : ""
                }`
              }
            >
              Skills
            </h1>
            <ul className="text-xs flex flex-col gap-2.5 pt-2">
              {skills.map((skill) => (
                <Skills skill={skill.title} key={skill.id} />
              ))}
            </ul>
          </div>
        );
      case "languages":
        return (
          <div
            key={section}
            className={`${isLeft ? "mt-[1.3rem]" : "mt-2.5"} max-w-full`}
          >
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Languages
            </h1>
            <ul className="text-xs flex flex-col gap-2.5 mt-2">
              {languages.map((lang) => (
                <Languages key={lang.id} language={lang.language} />
              ))}
            </ul>
          </div>
        );
      case "personalprofile":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Experience
            </h1>
            {workExperience.map((work) => (
              <WorkExperience
                company={work.jobCompany}
                enddate={work.jobEndDate}
                jobtitle={work.jobTitle}
                startdate={work.jobStartDate}
                summary={work.jobSummary}
                key={work.id}
              />
            ))}
          </div>
        );
      case "education":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Education
            </h1>
            {education.map((edu) => (
              <Education
                key={edu.id}
                eduDegree={edu.educationDegree}
                eduStartDate={edu.educationStartDate}
                eduEndDate={edu.educationEndDate}
                eduInstitute={edu.educationInstitute}
                isStudying={edu.isStillStudying}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PDFExport ref={forwardRef}>
        <div
          ref={forwardRef}
          id="template2"
          className={`template w-[640px] min-h-[800px] bg-white overflow-hidden`}
        >
          {/* RESUME BODY */}
          <div id="resume-body" className="w-full flex min-h-[900px]">
            {/* LEFT SECTION */}
            <div
              className={`text-white border-r px-5 pt-5 border-gray-300 w-[240px] max-w-[240px] bg-[${templateColor}]`}
            >
              {/* PERSONAL DETAILS */}
              <div className="mt-2.5">
                {/* AVATAR */}
                <div className="w-full flex justify-center">
                  <div className="relative w-16 h-16 rounded-full">
                    {!hideProfileImage && (
                      <Image
                        alt="user-image"
                        src={
                          !selectedImage
                            ? "https://cdn-icons-png.flaticon.com/512/7084/7084424.png"
                            : selectedImage
                        }
                        width={100}
                        height={100}
                        className={`bg-white rounded-full h-full object-cover ${
                          !selectedImage ? "bg-white" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
                {/* RESUME HEADER */}
                <div
                  style={{
                    position: "relative",
                    bottom: hideProfileImage ? "40px" : "",
                  }}
                  className="pt-4 py-5 break-words flex flex-col items-center justify-center"
                >
                  <h1
                    className={`${
                      resumeFontSize === 1
                        ? "text-[.75rem]"
                        : resumeFontSize === 2
                        ? "text-[.85rem]"
                        : resumeFontSize === 3
                        ? "text-[1rem]"
                        : ""
                    } font-medium max-w-[150px] break-words`}
                  >
                    {personalDetails.fname}&nbsp;
                    {personalDetails.lname}
                  </h1>
                  <span
                    className={`${
                      resumeFontSize === 1
                        ? "text-[.59rem]"
                        : resumeFontSize === 2
                        ? "text-[.64rem]"
                        : resumeFontSize === 3
                        ? "text-[.68rem]"
                        : ""
                    } mt-2 font-light max-w-full`}
                  >
                    {personalDetails.role}
                  </span>
                </div>
                {/* RESUME HEADER END */}
                <h1
                  className={
                    roboto.className +
                    ` ${
                      resumeFontSize === 1
                        ? "text-[.67rem]"
                        : resumeFontSize === 2
                        ? "text-[.70rem]"
                        : resumeFontSize === 3
                        ? "text-[.73rem]"
                        : ""
                    }`
                  }
                >
                  Details
                </h1>
                <div className="mt-2 flex flex-col gap-1 max-w-full">
                  <div>
                    <span
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.67rem]"
                          : resumeFontSize === 2
                          ? "text-[.70rem]"
                          : resumeFontSize === 3
                          ? "text-[.73rem]"
                          : ""
                      }`}
                    >
                      Address
                    </span>
                    <p
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.55rem]"
                          : resumeFontSize === 2
                          ? "text-[.60rem]"
                          : resumeFontSize === 3
                          ? "text-[.65rem]"
                          : ""
                      } max-w-[150px] break-words`}
                    >
                      {personalDetails.address}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.67rem]"
                          : resumeFontSize === 2
                          ? "text-[.70rem]"
                          : resumeFontSize === 3
                          ? "text-[.75rem]"
                          : ""
                      }`}
                    >
                      Phone
                    </span>
                    <p
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.55rem]"
                          : resumeFontSize === 2
                          ? "text-[.60rem]"
                          : resumeFontSize === 3
                          ? "text-[.65rem]"
                          : ""
                      } max-w-[150px] break-words`}
                    >
                      {personalDetails.phone}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.67rem]"
                          : resumeFontSize === 2
                          ? "text-[.70rem]"
                          : resumeFontSize === 3
                          ? "text-[.75rem]"
                          : ""
                      }`}
                    >
                      Email
                    </span>
                    <p
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.55rem]"
                          : resumeFontSize === 2
                          ? "text-[.60rem]"
                          : resumeFontSize === 3
                          ? "text-[.65rem]"
                          : ""
                      } max-w-[150px] break-words`}
                    >
                      {personalDetails.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* RENDER LEFT SIDE */}
              {leftSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>

            {/* RIGHT SECTION */}
            <div className="pl-4 pt-4 max-w-[400px]">
              {/* RENDER RIGHT SIDE */}
              {rightSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, false)}</div>
              ))}
            </div>
          </div>
        </div>
      </PDFExport>
    </>
  );
};

export default Resume2;
